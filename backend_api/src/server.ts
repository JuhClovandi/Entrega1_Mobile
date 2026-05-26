import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import routes from './routes';

export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

app.use('/api', routes);

  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });