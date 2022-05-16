const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

const AuthController = {
    login: async (req, res) => {
        try {
            const{ email, senha } = req.body;
            const usuario = await Usuario.findOne({
                where: {email}
            });

            if(!usuario) {
                return res.status(406).json({message: 'Dados do usuário está incorreto ou não existe'});
            };

            if(!bcrypt.compareSync(senha, usuario.senha)){
                return res.status(406).json({message: 'Dados do usuário está incorreto ou não existe'});
            }

            Object.assign(req.session, {
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome
                }
            });

            return res.status(200).json({usuario: usuario});
        } catch(err){
            console.log(err);
            return res.status(500).json({error: 'Não foi possível processar a requisição'});
        }
    },

    registrar: async (req, res) => {
        try {
            const { nome, email, senha, foto } = req.body;
            const hash = bcrypt.hashSync(senha, 10);

            const novoUsuario = await Usuario.create({
                nome,
                email,
                senha: hash,
                foto,
                createdAt: new Date().toISOString()
            });
            return res.status(201).json(novoUsuario);
        } catch(err){
            console.log(err);
        }
    }
};

module.exports = AuthController;