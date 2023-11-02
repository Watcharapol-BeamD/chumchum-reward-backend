const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

//get request

// router.get('/send_email',rewardController.getSendEmail)
// router.get('/get_reward',adminController.getReward)
// router.get('/get_reward_by_id/:reward_id',adminController.getRewardById)

//post request
router.post("/login", adminController.getLogin);
// router.post("/redeem_reward", rewardController.getRedeemReward);
router.get("/customer_info", adminController.getCustomerInfo);

module.exports = router;
