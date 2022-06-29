const jwt = require('jsonwebtoken');

const ValidarToken = (req, res, next) => {
    console.log(req.token);
    //Valdiando e descriptografando o token
    const usuario = jwt.verify(req.token, process.env.JWT_KEY);
    
    if(!usuario){
        return res.status(403).json({msg: "Sai pra lá com esse token"});
    }

    req.usuario = usuario;
    
    next();
}

module.exports = ValidarToken;