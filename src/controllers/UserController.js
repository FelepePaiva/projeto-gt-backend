import {getUserByIdService, updateUserByIdService, removeUserByIdService, createUserService } from "../services/UserService.js";

export const createUser = async (req, res, next) => {
    try
    {
      const newUser = await createUserService(req.body);
      res.status(201).json(newUser)
    }
    catch (err)
    {
      next(err);
    }
};
export const getUserById = async (req, res, next) => {
    const {id} = req.params;
    try 
    {
        const user = await getUserByIdService(id);
        res.status(200).json(user);
    }
    catch (err)
    {
      next(err)
    }
}
export const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.body;

  try {    
    const updatedUser = await updateUserByIdService(id, userData);
    res.status(200).json(updatedUser);
  } 
    catch (err) {
      next(err)
  }
};
export const removeUserById = async (req, res, next) => {
  const { id } = req.params;

  try {   
    await removeUserByIdService(id);
    return res.status(204).send();
  } catch (err) {
    next(err)
  }
};

