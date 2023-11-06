const express = require("express");
const router = express.Router();
const rewardController = require("../controllers/rewardController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });





//get request
// router.get('/has_reward',rewardController.getRedeemReward)
// router.get('/send_email',rewardController.getSendEmail)
router.get("/get_reward", rewardController.getReward);
router.get("/get_reward_by_id/:reward_id", rewardController.getRewardById);

//post request
router.post("/redeem_reward", rewardController.getRedeemReward);
router.post("/add_new_reward",upload.single('image'), rewardController.addNewReward);



module.exports = router;
