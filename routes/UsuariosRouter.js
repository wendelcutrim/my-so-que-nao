var express = require('express');
var router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const uploadDeAvatar = require('../middlewares/UploadDeAvatar');
const AuthController = require("../controllers/AuthController");

/* GET users listing. */
router.post('/', uploadDeAvatar, AuthController.registrar);
router.get('/', UsuariosController.buscar);
router.post('/login', AuthController.login);

module.exports = router;
