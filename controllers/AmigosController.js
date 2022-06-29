const { Usuario, Publicacao, sequelize, Sequelize } = require('../models');

const AmigosController = {
    listar: async (req, res) =>{
        
        // Capturar o usuario
        let usuario = req.usuario;

        // levantar os amigos do usuário atual
        let sql = `
            SELECT
                u.id, 
                u.nome,
                u.email,
                u.foto
            FROM
            amizades a
            INNER JOIN usuarios u ON (a.usuarios_id1 = u.id or a.usuarios_id2 = u.id)
            WHERE (a.usuarios_id1=${usuario.id} OR a.usuarios_id2=${usuario.id}) and aceita=1 and u.id<>${usuario.id}
        `;

        let amigos = await sequelize.query(sql, {type: Sequelize.QueryTypes.SELECT});
        console.log(amigos);
        // Enviar os amigos para ele
        res.status(200).json(amigos);
    }
};

/*SELECT
	u.id, 
    u.nome,
    u.email,
    u.foto
FROM
amizades a
INNER JOIN usuarios u ON (a.usuarios_id1 = u.id or a.usuarios_id2 = u.id)
WHERE (a.usuarios_id1=1 OR a.usuarios_id2=1) and aceita=1 and u.id<>1;

*/

module.exports = AmigosController;