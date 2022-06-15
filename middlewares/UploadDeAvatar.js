const multer = require('multer');
const storage = multer.diskStorage({
    destination: "./public/img/avatares/",
    filename: (req, file, cb) => {
        let novoNome = `${Math.random()}-${file.originalname}`;
        cb(null, novoNome);
    }
});
const upload = multer({storage});

module.exports = upload.single('foto');