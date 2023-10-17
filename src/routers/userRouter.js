const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
// const auth = require('../middleware/auth')

//Line
 const line = require('@line/bot-sdk');


//get request
router.get("/", userController.getAllUser);

//post request
router.post("/register", userController.getRegister);
router.post("/is_register", userController.getIsRegister);
router.post("/redeem_reward", userController.getRedeemReward);
 

module.exports = router;
