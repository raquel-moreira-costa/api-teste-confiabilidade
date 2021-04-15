const db = require("../models");
const Usuario = db.Usuario;

checarNomeLogin = (req, res, next) => {

  Usuario.findOne({
    where: {
      login: req.body.login
    }
  }).then(usuario => {
    if (usuario) {
      res.status(400).send({message: "Falha!Esse nome de usuário já existe!"});
      return;
    }
    next();
  });
}  
  
  module.exports = checarNomeLogin;

