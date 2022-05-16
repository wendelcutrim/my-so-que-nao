const multer = require('multer');
const path = require('path');
const { v4: gerarNomeAleatorio } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //Passando o caminho para onde os uploads serão salvos.
      cb(null, path.resolve("pictures","posts"));
    },
    filename: function (req, file, cb) {
        //Reconhecendo o formato do arquivo.
        const extensao = file.originalname.split('.').pop();
        const nomeArquivo = `${gerarNomeAleatorio()}.${extensao}`;

        cb(null, nomeArquivo);
    },
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;