const orderService = require('../services/orderService');

// Controladores para pedidos

// Criar um novo pedido
const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    return res.status(201).json({ message: 'Pedido criado com sucesso!', order });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Pedido já existe com esse numeroPedido.' });
    }
    return res.status(500).json({ error: 'Erro interno ao criar pedido.' });
  }
};

// Buscar um pedido por ID
const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado.' });
    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao buscar pedido.' });
  }
};

// Listar todos os pedidos
const listOrders = async (req, res) => {
  try {
    const orders = await orderService.listOrders();
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao listar pedidos.' });
  }
};

// Atualizar um pedido existente
const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(req.params.orderId, req.body);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado.' });
    return res.status(200).json({ message: 'Pedido atualizado com sucesso!', order });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao atualizar pedido.' });
  }
};

// Deletar um pedido
const deleteOrder = async (req, res) => {
  try {
    const deleted = await orderService.deleteOrder(req.params.orderId);
    if (!deleted) return res.status(404).json({ error: 'Pedido não encontrado.' });
    return res.status(200).json({ message: `Pedido ${req.params.orderId} deletado com sucesso!` });
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno ao deletar pedido.' });
  }
};

module.exports = { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };