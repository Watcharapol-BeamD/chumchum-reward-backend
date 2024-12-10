const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const auth = require('../middleware/auth')
//-------------------get request-------------------
 
// router.get('/send_email',rewardController.getSendEmail)
// router.get('/get_reward',adminController.getReward)
// router.get('/get_reward_by_id/:reward_id',adminController.getRewardById)
router.get('/redeem_reward_history',adminController.getRedeemRewardHistory)

//-------------------post request-------------------
router.post("/login", adminController.getLogin);
router.post("/reset_password",auth.verifyAccessToken, adminController.getResetAdminPassword);
router.post("/refresh_token" ,auth.verifyRefreshToken,adminController.getRefreshToken)
// router.post("/redeem_reward", rewardController.getRedeemReward);
router.post('/upload-sale-history',adminController.addNewSaleHistory)

module.exports = router;
