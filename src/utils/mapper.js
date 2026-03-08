//  Mapper para converter entre formatos de dados
// Mapeia o corpo da requisição para o formato de pedido esperado pelo banco de dados

const mapRequestToOrder = (body) => {
  return {
    orderId: body.numeroPedido,
    value: body.valorTotal,
    creationDate: new Date(body.dataCriacao),
    items: body.items.map((item) => ({
      productId: parseInt(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
};

// Mapeia os dados do banco de dados para o formato de resposta da API
const mapOrderToResponse = (order, items) => {
  return {
    orderId: order.orderId,
    value: parseFloat(order.value),
    creationDate: order.creationDate,
    items: items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: parseFloat(item.price),
    })),
  };
};

module.exports = { mapRequestToOrder, mapOrderToResponse };