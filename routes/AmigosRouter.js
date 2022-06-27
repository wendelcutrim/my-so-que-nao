const express = require('express');
const router = express.Router();
const AmigosController = require('../controllers/AmigosController');

router.get('/', AmigosController.listar)

module.exports = router;