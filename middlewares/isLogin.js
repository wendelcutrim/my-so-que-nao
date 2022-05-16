const isLogin = (req, res, next) => {
    const { usuario } = req.session;

    if( typeof usuario == "undefined" && !usuario) {
        return res.status(403).json({error: "Usuário não autenticado"});
    }

    res.locals.usuario = usuario;
    next();
}

module.exports = isLogin;