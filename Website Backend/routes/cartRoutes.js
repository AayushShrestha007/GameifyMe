const cartController = require("../controllers/cartController");
const router = require('express').Router();
const { authGuard } = require("../middleware/authGuard")

router.post("/add-to-cart", authGuard, cartController.addToCart)
router.get("/get-cart-items", authGuard, cartController.getUserCartItems)
router.post("/increase-cart-items", authGuard, cartController.incrementCartItem)
router.post("/decrease-cart-items", authGuard, cartController.decrementCartItem)
router.post("/remove-cart-items", authGuard, cartController.deleteCartItem)


module.exports = router;