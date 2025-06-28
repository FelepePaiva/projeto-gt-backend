import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';

import User from './User.js';
import Product from './Product.js';
import Category from './Category.js';
import ProductCategory from './ProductCategory.js';
import ProductImage from './ProductImage.js';
import ProductOption from './ProductOption.js';

const db = {
  sequelize,
  Sequelize,
  User,
  Product,
  Category,
  ProductCategory,
  ProductImage,
  ProductOption
};

Product.hasMany(ProductImage, { foreignKey: 'product_id', as: 'images' });
ProductImage.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });


Product.hasMany(ProductOption, { foreignKey: 'product_id', as: 'options' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Product.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: 'product_id',
  otherKey: 'category_id',
  as: 'categories'
});

Category.belongsToMany(Product, {
  through: ProductCategory,
  foreignKey: 'category_id',
  otherKey: 'product_id',
  as: 'products'
});

// -----------------------------------------------------

export default db;
