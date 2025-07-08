import { ZodError } from 'zod';
import { ValidationError } from 'sequelize';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      type: 'validation',
      errors: err.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }))
    });
  }

  if (err instanceof ValidationError) {
    return res.status(400).json({
      type: 'sequelize',
      errors: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'HttpError') {
    return res.status(err.status || 500).json({
      type: 'custom',
      error: err.message
    });
  }

  console.error('Erro inesperado:', err);
  return res.status(500).json({
    type: 'internal',
    error: 'Erro interno do servidor'
  });
};
