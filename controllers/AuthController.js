const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
    login: async (req, res) => {
        try {
            const{ email, senha } = req.body;
            const usuario = await Usuario.findOne({
                where: {email}
            });

            if(!usuario) {
                return res.status(401).json({message: 'Falha na autenticação'});
            };

            if(!bcrypt.compareSync(senha, usuario.senha)){
                return res.status(401).json({message: 'Falha na autenticação'});
            }

            //Configurando o token
            const token = jwt.sign({
                id: usuario.id,
                email: usuario.email
            }, 
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            });

            return res.status(200).json({message: "Auntenticação realizada com sucesso", token: token});
        } catch(err){
            console.log(err);
            return res.status(400).json({error: 'Dados enviados de forma incorreta ou fora do padrão'});
        }
    },

    registrar: async (req, res) => {
        try {
            const { nome, email, senha, foto } = req.body;
            const hash = bcrypt.hashSync(senha, 10);

            const verificarUsuarioCadastrado = await Usuario.findOne({where:{email: email}});

            if(verificarUsuarioCadastrado){
                res.status(401).json({error: "Falha na autenticação"});
            }

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
            return res.status(400).json({error:' Dados enviados de forma incorreta ou fora do padrão.'});
        }
    }
};

module.exports = AuthController;