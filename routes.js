const express = require("express");
const router = express.Router();

//Middlewares
const isLogin = require('./middlewares/isLogin');
const uploadProfile = require('./middlewares/uploadProfile');
const uploadPost = require('./middlewares/uploadPost');

//Controllers
const AuthController = require('./controllers/AuthController');
const AmigosController = require('./controllers/AmigosController');
const PublicacoesController = require('./controllers/PublicacoesController');
const UsuariosController = require('./controllers/UsuariosController');


//Autenticação e cadastro
router.post('/login', AuthController.login);
router.post('/usuarios', AuthController.registrar);

//Usuarios
router.put('/usuarios/:id', isLogin, uploadProfile.single("photo"), UsuariosController.atualizarUsuario);
router.delete('/usuarios/:id', isLogin, UsuariosController.deletarUsuario);

//Amigos

//Publicacões
router.get('/publicacoes', isLogin, PublicacoesController.exibirPublicacoes);
router.post('/publicacoes', isLogin, uploadPost.single("photo"),PublicacoesController.criarPublicacao);

module.exports = router;