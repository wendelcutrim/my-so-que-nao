var express = require('express');
var router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');
const uploadDeAvatar = require('../middlewares/UploadDeAvatar');

/* GET users listing. */
router.post('/', uploadDeAvatar, UsuariosController.registrar);
router.get('/', UsuariosController.buscar)

module.exports = router;
