import { addUserService, getUserByIdService, updateUserByIdService, removeUserByIdService } from "../services/UserService.js";

export const addUser = async (req, res) => {
    const user = req.body;
    try
    {
        const newUser = await addUserService(user);
        res.status(201).json(newUser);
    }
    catch (error)
    {
        res.status(400).json({msg: error.message});
    }
}
export const getUserById = async (req, res) => {
    const {id} = req.params;
    try 
    {
        const user = await getUserByIdService(id);
        res.status(200).json(user);
    }
    catch (error)
    {
        if (error.message === "ID inválido. Por favor insira um número.")
        {
        return res.status(400).json({msg: "ID inválido. Por favor insira um número."});
        }
        if (error.message === "Usuário não encontrado")
        {
            return res.status(404).json({msg: "Usuário não encontrado"});
        }
    }
}
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;

  try {
    if (!id || isNaN(Number(id))) 
    {
      return res.status(400).json({ msg: "ID inválido. Por favor insira um número." });
    }
    const updatedUser = await updateUserByIdService(id, userData);
    if (!updatedUser) 
    {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }
    if (Number(id) !== req.user.id) 
    {
      return res.status(401).json({ msg: "Você não tem permissão para atualizar este usuário." });
    }
    res.status(204).send();
    } 
    catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};
export const removeUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Primeiro valida o ID
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ msg: "ID inválido. Por favor insira um número." });
    }

    // Depois verifica permissão
    if (Number(id) !== req.user.id) {
      return res.status(401).json({ msg: "Você não tem permissão para remover este usuário." });
    }

    // Tenta remover
    const result = await removeUserByIdService(id);
    if (result === null) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    return res.status(204).send();
  } catch (error) {
    console.log("Usuário encontrado:", error);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

