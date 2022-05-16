const isLogin = (req, res, next) => {
    const { usuario } = req.session;

    if( typeof usuario == "undefined" && !usuario) {
        return res.redirect("/login");
    }

    res.locals.usuario = usuario;
    next();
}

module.exports = isLogin;