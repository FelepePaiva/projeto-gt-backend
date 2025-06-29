import { createProductService, getAllProductsService, getProductByIdService } from '../services/ProductService.js';

export const createProduct = async (req, res) => {
  const productData = req.body;

  try {
    const newProduct = await createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const getAllProducts = async (req, res) => {
  try 
  {
    const result = await getAllProductsService(req.query);
    res.status(200).json(result);
  } 
  catch (error) 
  { 
    console.error('Erro ao buscar produtos:', error);   
    res.status(400).json({ msg: 'Erro na requisição' });
  }
};
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ msg: 'ID inválido' });
  }

  try {
    const product = await getProductByIdService(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
}
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await updateProductByIdService(id, req.body);
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    if (err.status === 404) return res.status(404).json({ msg: err.message });
    res.status(400).json({ msg: 'Erro ao processar atualização do produto' });
  }
};
