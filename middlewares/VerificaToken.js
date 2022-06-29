const VerificaToken = (req, res, next) => {
    console.log(req.headers);
    if(req.headers.authorization) {
        req.token = req.headers.authorization.replace("Bearer ", "");
        return next();
    }

    return res.status(400).json({msg: "Requisição sem token"});

}

module.exports = VerificaToken;