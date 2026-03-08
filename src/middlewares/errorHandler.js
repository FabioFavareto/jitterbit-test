const errorHandler = (err, req, res, next) => {
  console.error('Erro:', err.message);
  return res.status(500).json({ error: 'Erro interno no servidor.' });
};

module.exports = errorHandler;