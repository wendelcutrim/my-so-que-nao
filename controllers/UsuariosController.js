const { Usuario } = require('../models');

const UsuariosController = {
    atualizarUsuario: async (req, res) => {
        try {
            
            const {id} = req.params;
            const {nome, email, senha} = req.body;
            await Usuario.update({
                nome,
                email,
                senha,
                foto: req.file.filename,
                updatedAt: new Date().toISOString
            },
            {
                where: {id: id}
            });

            const usuario = await Usuario.findByPk(id)

            return res.status(200).json(usuario);

        } catch(err){
            console.log(err);
            return res.status(400).json({error: 'Dados enviados de forma incorreta ou fora do padrão.'})

        }
    },

    deletarUsuario: async (req, res) => {
        try {
            const {id} = req.params;
            await Usuario.destroy({where: {id: id}});
            res.status(200).json({message: "Usuário deletado com sucesso"});
        } catch(err){
            console.log(err);
        }
    },
}

module.exports = UsuariosController;