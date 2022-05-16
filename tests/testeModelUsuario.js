const { Usuario, sequelize } = require('../models');

//Encontrar todos
// Usuario.findAll().then(result => console.log(result.toJSON()));

//Encontrar pela chave primária
Usuario.findByPk(2, {include: "publicacoes"}).then(result => {
    console.log(result.toJSON());
    sequelize.close();
});