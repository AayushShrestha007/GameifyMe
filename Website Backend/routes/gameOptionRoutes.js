const gameOptionController = require("../controllers/gameOptionController");
const router = require('express').Router();
const { adminGuard, authGuard } = require("../middleware/authGuard")

router.post("/create-game-option", authGuard, adminGuard, gameOptionController.createGameOption)
router.get("/get-all-options", gameOptionController.getAllGameOptions)
router.get("/get-game-option/:id", gameOptionController.getGameOptionById);

module.exports = router;