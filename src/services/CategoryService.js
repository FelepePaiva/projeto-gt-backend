import Category from "../models/Category.js"

export const createCategoryService = async ({name, slug, use_in_menu}) => {
    const category = await Category.create({
        name,
        slug, 
        use_in_menu: use_in_menu ?? false
    });
    return category;
} 

export const getAllCategoriesService = async ({limit = 12, page = 1, fields, use_in_menu}) => {
    const where = {};
    if (use_in_menu === 'true')
    {
        where.use_in_menu = true;
    }
    const attributes = fields ? fields.split(',') : undefined;
    const options = {
        where,
        attributes
    };
    if (Number(limit) !== -1) {
        options.limit = Number(limit);
        options.offset = (Number(page) -1) * Number(limit);
    } 
    const result = await Category.findAll(options);
    return result;    
}
export const updateCategoryByIdService = async (id, dataToUpdate) => {
    if (!id || isNaN(Number(id)))
        {
            throw new Error("ID inválido. Por favor insira um número.")
        }
    const existingCategory = await Category.findByPk(id);
    if(!existingCategory)
        {
            return null;
        }
    if (!dataToUpdate.name || !dataToUpdate.slug)
        {
            throw new Error("Os campos nome e slug são obrigatórios")
        }
    existingCategory.name = dataToUpdate.name;
    existingCategory.slug = dataToUpdate.slug;
    existingCategory.use_in_menu = dataToUpdate.use_in_menu;
    await existingCategory.save();
    return existingCategory;
}
export const getCategoryByIdService = async(id) => {
    const existingCategory = await Category.findByPk(id);
    if(!existingCategory)
    {
        return null
    }
    return existingCategory;
}
export const removeCategoryByIdService = async(id) => {
    const existingCategory = await Category.findByPk(id);
    if (!existingCategory)
    {
        return null
    }
    existingCategory.destroy();
    return true;
}