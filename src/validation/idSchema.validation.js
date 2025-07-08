import {z} from 'zod';
export const idSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'ID precisa ser um número inteiro e maior que zero',
    }),
});