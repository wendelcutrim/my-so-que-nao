const { Usuario, Publicacao } = require('../models');
const { Op } = require('sequelize');

const AmigosController = {
    listar: async (req, res) => {
        res.send("Ok")
    }
};

module.exports = AmigosController;