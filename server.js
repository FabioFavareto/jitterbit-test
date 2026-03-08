require('dotenv').config();
const express = require('express');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middlewares globais ──────────────────────────────────────
app.use(express.json());

// ─── Rotas ───────────────────────────────────────────────────
app.use('/', routes);

// ─── Rota raiz ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'API de Pedidos funcionando!',
    endpoints: {
      login:        'POST   /auth/login',
      criarPedido:  'POST   /order',
      buscarPedido: 'GET    /order/:orderId',
      listarTodos:  'GET    /order/list',
      atualizar:    'PUT    /order/:orderId',
      deletar:      'DELETE /order/:orderId',
    },
  });
});

// ─── Erro 404 ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// ─── Iniciar servidor ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;