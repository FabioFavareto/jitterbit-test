const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Rotas de autenticação
// Rota de login - Gera um token JWT para o usuário
router.post('/login', login);

module.exports = router;