const paymentController = require("../controllers/paymentController");
const router = require('express').Router();
const { authGuard } = require("../middleware/authGuard")

router.post("/initialize-khalti", authGuard, paymentController.initializeKhalti)
router.get("/complete-khalti-payment", paymentController.completeKhaltiPayment)



module.exports = router;