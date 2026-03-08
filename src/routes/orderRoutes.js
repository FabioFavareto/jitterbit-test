const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');
const {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

// Cria pedidos
router.post('/', authMiddleware, createOrder);
// Listar pedidos
router.get('/list', authMiddleware, listOrders);
// Buscar pedido por ID
router.get('/:orderId', authMiddleware, getOrderById);
// Atualizar um pedido existente
router.put('/:orderId', authMiddleware, updateOrder);
// Deletar um pedido
router.delete('/:orderId', authMiddleware, deleteOrder);

module.exports = router;