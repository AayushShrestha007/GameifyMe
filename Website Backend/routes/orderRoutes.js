const orderController = require("../controllers/orderController");
const router = require('express').Router();
const { authGuard } = require("../middleware/authGuard")

router.post("/create-order", authGuard, orderController.placeOrder)
router.get("/order-history", authGuard, orderController.getOrderHistory)



module.exports = router;