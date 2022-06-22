var express = require('express');
var router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const uploadDeAvatar = require('../middlewares/UploadDeAvatar');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/', uploadDeAvatar, UsuariosController.registrar);
router.get('/', UsuariosController.buscar);
router.post('/login', UsuariosController.login);

module.exports = router;
