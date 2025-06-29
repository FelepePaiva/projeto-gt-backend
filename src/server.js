import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/UserRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js';
import productRoutes from './routes/ProductRoutes.js';



dotenv.config();

const app = express();
app.use(express.json());
app.use('/v1', userRoutes);
app.use('/v1', authRoutes);
app.use('/v1', categoryRoutes);
app.use('/v1', productRoutes)

app.get('/', (req, res) => {
  res.send('API está rodando!');
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o MySQL foi bem-sucedida!');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Não foi possível conectar ao banco de dados:', error);
  }
};

startServer();
