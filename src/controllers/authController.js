const { generateToken } = require('../middlewares/auth');

// Controlador para autenticação

// Login de usuário (Sem banco de dados)
const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    const token = generateToken({ username, role: 'admin' });
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      token,
    });
  }

  return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
};

module.exports = { login };