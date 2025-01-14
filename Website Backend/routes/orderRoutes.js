const orderController = require("../controllers/orderController");
const router = require('express').Router();
const { authGuard } = require("../middleware/authGuard")

router.post("/create-order", authGuard, orderController.placeOrder)


module.exports = router;