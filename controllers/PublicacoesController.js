const { Usuario, Publicacao } = require('../models');

const PublicacoesController = {
    exibirPublicacoes: async (req, res) => {
        try{
            const {usuario} = req.session;
            const publicacoes = await Publicacao.findAll({
                include: ["autor", "curtidores"], order: [["createdAt", "DESC"]], where:{id: usuario.id}
            });

            return res.status(200).json(publicacoes);
        } catch(err){
            console.log(err);
        }
    },

    criarPublicacao: async (req, res) => {
        try{
            
            const {usuario} = req.session;
            const novaPublicacao = await Publicacao.create({
                texto: req.body.texto,
                imagem: req.file.filename,
                usuarios_id: usuario.id,
                createdAt: new Date().toISOString(),
            });
            return res.status(201).json(novaPublicacao);
        } catch(err){
            console.log(err);
        }
    }
};

module.exports = PublicacoesController;