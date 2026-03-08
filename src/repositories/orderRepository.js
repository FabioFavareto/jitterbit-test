const pool = require('../config/database');

// Funções de acesso ao banco de dados para pedidos
// Criar um novo pedido
const create = async (conn, order) => {
  await conn.query(
    'INSERT INTO `Order` (`orderId`, `value`, `creationDate`) VALUES (?, ?, ?)',
    [order.orderId, order.value, order.creationDate]
  );

  for (const item of order.items) {
    await conn.query(
      'INSERT INTO `Items` (`orderId`, `productId`, `quantity`, `price`) VALUES (?, ?, ?, ?)',
      [order.orderId, item.productId, item.quantity, item.price]
    );
  }
};

// Buscar um pedido por ID
const findById = async (orderId) => {
  const [orderRows] = await pool.query(
    'SELECT * FROM `Order` WHERE `orderId` = ?',
    [orderId]
  );

  if (orderRows.length === 0) return null;

  const [itemRows] = await pool.query(
    'SELECT * FROM `Items` WHERE `orderId` = ?',
    [orderId]
  );

  return { order: orderRows[0], items: itemRows };
};

// Listar todos os pedidos
const findAll = async () => {
  const [orders] = await pool.query(
    'SELECT * FROM `Order` ORDER BY `creationDate` DESC'
  );

  const result = await Promise.all(
    orders.map(async (order) => {
      const [items] = await pool.query(
        'SELECT * FROM `Items` WHERE `orderId` = ?',
        [order.orderId]
      );
      return { order, items };
    })
  );

  return result;
};

// Atualizar um pedido existente
const update = async (conn, orderId, order) => {
  await conn.query(
    'UPDATE `Order` SET `value` = ?, `creationDate` = ? WHERE `orderId` = ?',
    [order.value, order.creationDate, orderId]
  );

  await conn.query('DELETE FROM `Items` WHERE `orderId` = ?', [orderId]);

  for (const item of order.items) {
    await conn.query(
      'INSERT INTO `Items` (`orderId`, `productId`, `quantity`, `price`) VALUES (?, ?, ?, ?)',
      [orderId, item.productId, item.quantity, item.price]
    );
  }
};

// Deletar um pedido
const remove = async (orderId) => {
  const [result] = await pool.query(
    'DELETE FROM `Order` WHERE `orderId` = ?',
    [orderId]
  );
  return result.affectedRows;
};

module.exports = { create, findById, findAll, update, remove };