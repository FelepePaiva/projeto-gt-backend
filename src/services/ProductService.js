import db from '../models/index.js';
import { Op } from 'sequelize';

const { Product, Category, ProductImage, ProductOption } = db;

export const createProductService = async (data) => {
  const {
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images,
    options
  } = data;

  const transaction = await sequelize.transaction();

  try {
    const product = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    }, { transaction });

    if (Array.isArray(category_ids) && category_ids.length > 0) {
      const relations = category_ids.map((category_id) => ({
        product_id: product.id,
        category_id
      }));

      await ProductCategory.bulkCreate(relations, { transaction });
    }
    if (Array.isArray(images) && images.length > 0) {
      const imageRecords = images.map((img) => ({
        product_id: product.id,
        enabled: true,
        path: `data:${img.type};base64,${img.content}`
      }));

      await ProductImage.bulkCreate(imageRecords, { transaction });
    }
    if (Array.isArray(options) && options.length > 0) {
      const optionRecords = options.map((opt) => {
        const values = JSON.stringify(opt.value || opt.values || []);
        return {
          product_id: product.id,
          title: opt.title,
          shape: opt.shape || 'square',
          radius: parseInt(opt.radius) || 0,
          type: opt.type || 'text',
          values
        };
      });

      await ProductOption.bulkCreate(optionRecords, { transaction });
    }
    await transaction.commit();
    return product;

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
export const getAllProductsService = async (query) => {
  const {
    limit = 12,
    page = 1,
    match
  } = query;

  const where = {};

  // ✅ Limpar espaços extras e quebras de linha
  const cleanMatch = match?.trim();

  if (cleanMatch) {
    where[Op.or] = [
      { name: { [Op.like]: `%${cleanMatch}%` } },
      { description: { [Op.like]: `%${cleanMatch}%` } }
    ];
  }

  const parsedLimit = parseInt(limit);
  const parsedPage = parseInt(page);
  const offset = parsedLimit === -1 ? null : (parsedPage - 1) * parsedLimit;

  const { rows, count } = await Product.findAndCountAll({
    where,
    include: [
      {
        model: ProductImage,
        as: 'images',
        attributes: ['id', 'path'],
        required: false
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
        required: false
      },
      {
        model: ProductOption,
        as: 'options',
        required: false
      }
    ],
    limit: parsedLimit === -1 ? undefined : parsedLimit,
    offset: parsedLimit === -1 ? undefined : offset,
    distinct: true
  });

  const data = rows.map((product) => ({
    ...product.toJSON(),
    images: product.images.map((img) => ({
      id: img.id,
      content: img.path
    })),
    category_ids: product.categories.map((cat) => cat.id)
  }));

  return {
    data,
    total: count,
    limit: parsedLimit,
    page: parsedLimit === -1 ? 1 : parsedPage
  };
};
export const getProductByIdService = async (id) => {
  const product = await Product.findOne({
    where: { id: Number(id) },
    include: [
      {
        model: ProductImage,
        as: 'images',
        attributes: ['id', 'path']
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
        attributes: ['id']
      },
      {
        model: ProductOption,
        as: 'options'
      }
    ]
  });

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  const json = product.toJSON();

  return {
    id: json.id,
    enabled: json.enabled,
    name: json.name,
    slug: json.slug,
    stock: json.stock,
    description: json.description,
    price: json.price,
    price_with_discount: json.price_with_discount,
    category_ids: json.categories.map(cat => cat.id),
    images: json.images.map(img => ({
      id: img.id,
      content: img.path // Aqui você pode montar a URL real se quiser
    })),
    options: json.options
  };
};
export const updateProductByIdService = async (id, payload) => {
  const product = await Product.findByPk(id);
  if (!product) throw { status: 404, message: 'Produto não encontrado' };

  const transaction = await sequelize.transaction();
  try {
    const {
      name, slug, description, price,
      price_with_discount, enabled, stock,
      category_ids = [], images = [], options = []
    } = payload;

    // Atualizar produto principal
    await product.update({
      name, slug, description, price,
      price_with_discount, enabled, stock
    }, { transaction });

    // Atualizar categorias (remover e recriar)
    await ProductCategory.destroy({ where: { product_id: id }, transaction });
    if (Array.isArray(category_ids)) {
      await ProductCategory.bulkCreate(
        category_ids.map(catId => ({ product_id: id, category_id: catId })),
        { transaction }
      );
    }

    // Atualizar imagens
    for (const img of images) {
      if (img.deleted && img.id) {
        await ProductImage.destroy({ where: { id: img.id, product_id: id }, transaction });
      } else if (img.id) {
        await ProductImage.update(
          { path: img.content },
          { where: { id: img.id, product_id: id }, transaction }
        );
      } else {
        await ProductImage.create(
          { product_id: id, path: img.content },
          { transaction }
        );
      }
    }

    // Atualizar opções
    for (const opt of options) {
      if (opt.deleted && opt.id) {
        await ProductOption.destroy({ where: { id: opt.id, product_id: id }, transaction });
      } else if (opt.id) {
        await ProductOption.update(
          {
            title: opt.title,
            shape: opt.shape,
            radius: opt.radius,
            type: opt.type,
            values: Array.isArray(opt.values) ? JSON.stringify(opt.values) : opt.values
          },
          { where: { id: opt.id, product_id: id }, transaction }
        );
      } else {
        await ProductOption.create(
          {
            product_id: id,
            title: opt.title,
            shape: opt.shape,
            radius: opt.radius,
            type: opt.type,
            values: Array.isArray(opt.values) ? JSON.stringify(opt.values) : opt.values
          },
          { transaction }
        );
      }
    }

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const removeProductByIdService = async (id) => {
  const deletedCount = await Product.destroy({
    where: { id }
  });

  return deletedCount > 0;
};