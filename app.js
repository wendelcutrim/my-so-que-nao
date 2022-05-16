const express = require('express');
const app = express();
const logger = require('morgan');
const path = require('path');
const session = require('express-session');

const port = process.env.PORT || 3000;

const routes = require('./routes');

//Server configs
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Global middlewares
app.use(session({
    secret: 'Minha primeira rede social',
    resave: true,
    saveUninitialized: true,
}));

//Routes
app.use('/api/v1', routes);

app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));

