import User from "../models/User.js";
import bcrypt from 'bcrypt';
import {HttpError} from '../errors/HttpError.js'

export const createUserService = async (user) => {
    const {firstname, surname, email, password, confirmPassword} = user;

    const existingUser = await User.findOne({where: {email}});

    if (existingUser)
    {
        throw new HttpError(409, "O email já está cadastrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({firstname, surname, email, password: hashedPassword});
    return newUser;
}
export const getUserByIdService = async (id) => {
    const existingUser = await User.findByPk(id);
    if (!existingUser)
    {
        throw new HttpError(404, "Usuário não encontrado")
    }
    const userToView = {
        id: existingUser.id,
        firstname: existingUser.firstname,
        surname: existingUser.surname,
        email: existingUser.email
    };
    return userToView;
}
export const updateUserByIdService = async (id, dataToUpdate) => {
    const existingUser = await User.findByPk(id);

    if(!existingUser)
    {
        throw new HttpError(404, "Usuário não encontrado");
    }
    if (dataToUpdate.firstname !== undefined) existingUser.firstname = dataToUpdate.firstname;
    if (dataToUpdate.surname !== undefined) existingUser.surname = dataToUpdate.surname;
    if (dataToUpdate.email !== undefined) existingUser.email = dataToUpdate.email;

    if (dataToUpdate.password)
    {
        const hashedPassword = await bcrypt.hash(dataToUpdate.password, 10);
        existingUser.password = hashedPassword;
    }
   
    await existingUser.save();
    return {
        id: existingUser.id,
        firstname: existingUser.firstname,
        surname: existingUser.surname,
        email: existingUser.email
    };
}
export const removeUserByIdService = async (id) => {
    const existingUser = await User.findByPk(id);

    if(!existingUser)
    {
        throw new HttpError(404, "Usuário não encontrado")
    }
    await existingUser.destroy();
    return true;
}