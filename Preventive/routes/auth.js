const authControllers = require("../controllers/authController")
const router = require("express").Router();

router.post("/register",authControllers.register)

router.post("/login",authControllers.login)



module.exports = router