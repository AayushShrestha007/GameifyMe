const emailController = require("../controllers/emailController");
const router = require('express').Router();
const { authGuard } = require("../middleware/authGuard")

router.post("/contact", emailController.sendContactEmail)

module.exports = router;