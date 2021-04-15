const {Router} = require("express");
const {  } = require("../middleware");
const controllerAuth = require("../controllers/auth.controller");
const router = Router();

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get('/', (req,res) => res.send("Rota habilitada!"));


router.post("/cadastrar",
    checarNomeLogin,
    controllerAuth.cadastrar);

router.post("/login", controllerAuth.entrar);

module.exports = router