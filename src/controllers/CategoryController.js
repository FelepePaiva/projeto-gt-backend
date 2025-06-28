import { createCategoryService, getAllCategoriesService, getCategoryByIdService, removeCategoryByIdService, updateCategoryByIdService } from "../services/CategoryService.js";

export const createCategory = async (req, res) => {
    try
    {
        const {name, slug, use_in_menu} = req.body;
        if (!name || !slug)
        {
            return res.status(400).json({msg: "Nome e slug são obrigatórios"});
        }
        const category = await createCategoryService({name, slug, use_in_menu});
        res.status(201).json(category)
    }
    catch(error)
    {
        return res.status(500).json({msg: "Erro ao cadastrar categoria"});
    }
};
export const getAllCategories = async (req, res) => {
    try 
    {
        const {limit, page, fields, use_in_menu} = req.query;
        const categories = await getAllCategoriesService({limit, page, fields, use_in_menu});
        res.status(200).json(categories);
    }
    catch (error)
    {
        res.status(500).json({error: "Erro ao buscar categoria"})
    }
}
export const updateCategoryById = async(req, res) => {
    const {id} = req.params;
    const {name, slug, use_in_menu} = req.body;

    try
    {{
        if (!id || isNaN(Number(id))) 
        
            return res.status(400).json({ msg: "ID inválido. Por favor insira um número." });
        }
        if (!name || !slug )
        {
            return res.status(400).json({msg: "Os campos nome e slug são obrigatórios"});
        }
        const existingCategory = await updateCategoryByIdService(id, {name, slug, use_in_menu});
        if(!existingCategory)
        {
            res.status(404).json({msg: "Categoria não encontrada"})
        }
        res.status(200).json(existingCategory);
    }
    catch(error)
    {
        res.status(500).json({msg: "Erro no servidor"})
    }
}
export const getCategoryById = async (req, res) => {
    const {id} = req.params;
    if (!id || isNaN(Number(id))) 
    {
        return res.status(400).json({ msg: "ID inválido. Por favor insira um número." });
    }
    try{
    const category = await getCategoryByIdService(id);
    if (!category)
    {
        return res.status(404).json({msg: "Categoria não encontrada"});
    }
    res.status(200).json(category);
    }
    catch(error)
    {
        res.status(500).json({msg: "Erro no servidor"});
    }
}
export const removeCategoryById = async (req, res) => {
    const {id} = req.params;
    if (!id || isNaN(Number(id))) 
    {
        return res.status(400).json({ msg: "ID inválido. Por favor insira um número." });
    }
    try
    {
        const category = await removeCategoryByIdService(id);
        if (!category)
        {
            return res.status(404).json({msg: "Categoria não encontrada"});
        }
        res.status(200).json({msg: "A categoria foi removida com sucesso"})
    }
    catch(error)
    {
        res.status(500).json({msg: "Erro no servidor"})
    }
}
