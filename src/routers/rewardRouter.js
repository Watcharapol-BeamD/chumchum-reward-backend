const express = require("express");
const router = express.Router();
const rewardController = require("../controllers/rewardController");

//get request
router.get('/has_reward',rewardController.getRedeemReward)

//post request


module.exports = router;