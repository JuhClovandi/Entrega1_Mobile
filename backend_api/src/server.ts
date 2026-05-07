import express from 'express';
import cors from 'cors';
import routes from './routes';

export const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middlewares Globais
app.use(cors());
// IMPORTANTE: O express.json() deve vir antes das rotas para que o req.body funcione
app.use(express.json());

// 2. Rota de Teste (Opcional)
app.get('/', (req, res) => {
  res.send('API funcionando! 🚀');
});

// 3. Uso do Router Centralizado
// Todas as suas rotas de usuários, ufs e cidades agora estão sob o prefixo /api
app.use('/api', routes);

// 4. Inicialização do Servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}