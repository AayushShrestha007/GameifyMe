const userControllers = require("../controllers/userController");
const router = require('express').Router();


//Creating user registration route
router.post("/create", userControllers.createUser)
router.post("/login", userControllers.login)

module.exports = router;