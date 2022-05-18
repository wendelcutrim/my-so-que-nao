const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    } catch(err){
        return res.status(401).json({message: 'Falha na autenticação'});
    }
}

module.exports = isLogin;