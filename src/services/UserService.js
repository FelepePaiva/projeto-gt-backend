import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const addUserService = async (user) => {
    const {firstname, surname, email, password, confirmPassword} = user;

    if (!firstname || !surname || !email || !password || !confirmPassword)
    {
        throw new Error("Todos os campos são obrigatórios");
    }
    if (password !== confirmPassword)
    {
        throw new Error("As senhas não coincidem")
    }
    const existingUser = await User.findOne({where: {email}});

    if (existingUser)
    {
        throw new Error("O email já está cadastrado");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({firstname, surname, email, password: hashedPassword});
    return newUser;
}
export const getUserByIdService = async (id) => {
    if (!id || isNaN(Number(id)))
    {
        throw new Error("ID inválido. Por favor insira um número.")
    }
    const existingUser = await User.findByPk(id);
    if (!existingUser)
    {
        throw new Error("Usuário não encontrado")
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

    if (!id || isNaN(Number(id)))
    {
        throw new Error("ID inválido. Por favor insira um número.")
    }
    if(!existingUser)
    {
        return null;
    }
    existingUser.firstname = dataToUpdate.firstname;
    existingUser.surname = dataToUpdate.surname;
    existingUser.email = dataToUpdate.email;
    await existingUser.save();
    return {
        id: existingUser.id,
        firstname: existingUser.firstname,
        surname: existingUser.surname,
        email: existingUser.email
    };
}
export const removeUserByIdService = async (id) => {
    if (!id || isNaN(Number(id)))
    {
        throw new Error("ID inválido. Por favor insira um número.")
    }
    const existingUser = await User.findByPk(id);

    if(!existingUser)
    {
        return null;
    }
    await existingUser.destroy();
    return true;
}