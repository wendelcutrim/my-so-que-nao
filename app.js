var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var UsuariosRouter = require('./routes/UsuariosRouter');
var AmigosRouter = require('./routes/AmigosRouter');
const VerificaToken = require('./middlewares/VerificaToken');
const ValidarToken = require('./middlewares/ValidarToken');
const cors = require('cors');

var app = express();

//Server config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//Routes
app.use('/api/v1/usuarios', UsuariosRouter);
app.use('/api/v1/amigos', VerificaToken, ValidarToken, AmigosRouter);

module.exports = app;
