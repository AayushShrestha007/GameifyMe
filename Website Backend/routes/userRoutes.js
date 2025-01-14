const userControllers = require("../controllers/userController");
const router = require('express').Router();

router.post("/create", userControllers.createUser)
router.post("/login", userControllers.login)

module.exports = router;