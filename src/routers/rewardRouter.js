const express = require("express");
const router = express.Router();
const rewardController = require("../controllers2/rewardController");

//get request
// router.get('/has_reward',rewardController.getRedeemReward)
// router.get('/send_email',rewardController.getSendEmail)
router.get('/get_reward',rewardController.getReward)
router.get('/get_reward_by_id/:reward_id',rewardController.getRewardById)

//post request
router.post("/redeem_reward", rewardController.getRedeemReward);


module.exports = router;