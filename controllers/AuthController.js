const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {

    registrar: async (req, res) => {
        try {
            //Capturar os dados do Usuário que foi enviado pelo req.body;
            const { nome, email, senha } = req.body;

            //Criptografar a senha do usuário
            const hash = bcrypt.hashSync(senha, 10);

            //Verificar se o usuário já tem cadastro no nosso banco de dados
            const verificarUsuarioCadastrado = await Usuario.findOne({where: {email: email}});

            //Barrar o cadastro do usuário caso já esteja cadastrado no banco de dados.
            if(verificarUsuarioCadastrado){
                return res.status(409).json({error: 'Usuário com email já cadastrado'});
            }

            //Cadastrar um novo usuário no banco de dados.
            const novoUsuario = await Usuario.create({nome, email, senha: hash, foto: req.file?.filename});

            //Retorna um JSON com os dados do usuário cadastrado.
            return res.status(201).json(novoUsuario);

        } catch (error){
            console.log(error);
            return res.status(500).json({error})
        }
    },

    login: async (req, res) => {
        //return res.status(200).json(req.body);
        try{
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({where: {email}});
            if(!usuario){
                return res.status(403).json("Falha no login");
            }

            if(!bcrypt.compareSync(senha, usuario.senha)){
                return res.status(403).json("Falha no login");
            }

            /* const usuarioToken = {
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome,
                foto: usuario.foto
            } */

            //Removendo os campos desnecessários para o front:
            delete usuario.senha;
            delete usuario.createdAt;
            delete usuario.updatedAt;
            delete usuario.deletedAt;

            let token = jwt.sign(usuario.toJSON(), process.env.JWT_KEY);

            return res.status(200).json({usuario: usuario, token});
        } catch(error){
            console.log(error);
            return res.status(500).json("Error");
        }
    }
}

module.exports = AuthController;