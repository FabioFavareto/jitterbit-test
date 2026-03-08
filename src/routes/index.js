const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const orderRoutes = require('./orderRoutes');

// Rotas principais da aplicação
router.use('/auth', authRoutes);
// Rotas de pedidos (protegidas por autenticação)
router.use('/order', orderRoutes);

module.exports = router;