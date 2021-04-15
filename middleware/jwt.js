const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const db = require("../models");
const Usuario = db.Usuario;

autorizarToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({message: "Nenhum token fornecido!"});
    }  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({message: "Não autorizado"});
      }
      req.id = decoded.id;
      next();
    });
  };

module.exports = autorizarToken;


