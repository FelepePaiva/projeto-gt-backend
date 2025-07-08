import { z } from 'zod';

export const userUpdateSchema = z.object({
  firstname: z.string().min(2).optional(),
  surname: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6, 'A senha precisa ter 6 caracteres, no mínimo').optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem',
});
