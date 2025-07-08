import {z} from 'zod';

export const userSchema = z.object({
    firstname: z.string().min(1, "O nome é obrigatório"),
    surname: z.string().min(1, "O sobrenome é obrigatório"),
    email: z.string().email("Formato de email inválido"),
    password: z.string().min(6, "A senha deve ter 6 caracteres, no mínimo"),
    confirmPassword: z.string().min(6, "Confirmação de senha obrigatória")
}).refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'], 
    message: 'As senha não são iguais',
});