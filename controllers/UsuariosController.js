const { Usuario } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
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

    buscar: async (req, res) => {
        try{
            //Capturar o trecho que está sendo buscado

            let trechoBuscado = req.query.q;
            if(trechoBuscado){
                //Carregar os usuários que tenham o trecho busado no nome
                // SELECT * FROm usuarios WHERE nome like(%'{trechoBuscado}%');
                const usuario = await Usuario.findAll({
                    where: {nome: {[Op.substring]: trechoBuscado}}
                });
    
                //Enviar para o cliente os usuarios leventados
    
                return res.send(usuario);
    
                //Consulta: http://localhost:3000/api/v1/usuarios?q=1
            }

            const usuario = await Usuario.findAll();
            return res.send(usuario);

        } catch (error){
            console.log(error);
            return res.send({message: "Erro"});
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

            let token = jwt.sign(usuario.toJSON(), process.env.JWT_KEY);

            return res.status(200).json({msg:"Sucess", token});
        } catch(error){
            console.log(error);
            return res.status(500).json("Error");
        }
    }
};