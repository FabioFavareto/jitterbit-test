const pool = require('../config/database');
const orderRepository = require('../repositories/orderRepository');
const { mapRequestToOrder, mapOrderToResponse } = require('../utils/mapper');

// Lógica de negócios para pedidos
// Criar um novo pedido
const createOrder = async (body) => {
  const mapped = mapRequestToOrder(body);
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    await orderRepository.create(conn, mapped);
    await conn.commit();
    return mapped;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// Buscar um pedido por ID
const getOrderById = async (orderId) => {
  const data = await orderRepository.findById(orderId);

  if (!data) return null;

  return mapOrderToResponse(data.order, data.items);
};

// Listar todos os pedidos
const listOrders = async () => {
  const data = await orderRepository.findAll();
  return data.map(({ order, items }) => mapOrderToResponse(order, items));
};

// Atualizar um pedido existente
const updateOrder = async (orderId, body) => {
  const exists = await orderRepository.findById(orderId);

  if (!exists) return null;

  const mapped = mapRequestToOrder(body);
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();
    await orderRepository.update(conn, orderId, mapped);
    await conn.commit();
    return { ...mapped, orderId };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

// Deletar um pedido
const deleteOrder = async (orderId) => {
  const affectedRows = await orderRepository.remove(orderId);
  return affectedRows > 0;
};

module.exports = { createOrder, getOrderById, listOrders, updateOrder, deleteOrder };