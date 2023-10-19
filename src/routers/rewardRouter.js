const express = require("express");
const router = express.Router();
const rewardController = require("../controllers/rewardController");

//get request
router.get('/has_reward',rewardController.getRedeemReward)
router.get('/send_email',rewardController.getSendEmail)
//post request


module.exports = router;