const db = require("../models");
const config = require("../config/config.json");
const Usuario = db.Usuario;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.cadastrar = (req, res) => {
    Usuario.create({
        login: req.body.login,
        senha: bcrypt.hashSync(req.body.senha, 8)
    })
    .then(res.send({message: "Usuário registrado com sucesso!"}))
    .catch(err => {
        res.status(500).send({ message: err.message });
      });
};

exports.entrar = (req,res) =>{
    Usuario.findOne({
        where: {login: req.body.login}})
        .then(user => {
          if (!user){
            return res.status(404).send({ message: "Usuário não encontrado" });
          }

          var passwordIsValid = bcrypt.compareSync(req.body.senha, user.senha);

          if (!passwordIsValid){
            return res.status(401).send({ accessToken: null, message: "Senha inválida!"
            });
          }
    
          var token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400});
    
            res.status(200).send({
              id: user.id,
              login: user.login,
              accessToken: token
            });
          })
          .catch(err => {
          res.status(500).send({ message: err.message });
        });
    };