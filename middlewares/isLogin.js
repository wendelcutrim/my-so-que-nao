const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try {

<<<<<<< HEAD
        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    } catch(err){
        return res.status(401).json({message: 'Falha na autenticação'});
=======
    if( typeof usuario == "undefined" && !usuario) {
        return res.status(403).json({error: "Usuário não autenticado"});
>>>>>>> 3689a11ef9c269993b50b933db1e5d8cecc426ab
    }
}

module.exports = isLogin;