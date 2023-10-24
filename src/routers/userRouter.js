const express = require("express");
const router = express.Router();
const userController = require("../controllers2/userController");
// const auth = require('../middleware/auth')
 
//get request
router.get("/", userController.getAllUser);
 
//post request
router.post("/register", userController.getRegister);
router.post("/is_register", userController.getIsRegister);
// router.post("/redeem_reward", userController.getRedeemReward);


module.exports = router;
