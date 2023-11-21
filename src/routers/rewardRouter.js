const express = require("express");
const router = express.Router();
const rewardController = require("../controllers/rewardController");
const upload =require('../middleware/fileStorage')
const auth = require('../middleware/auth')
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

//------------------------------
// Set up Multer for file uploads

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/'); // Define the destination to save uploaded files
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname); // Use the original filename for the uploaded file
//     }
//   });
  
//   const upload = multer({ storage: storage });


//---------------------------------



//get request
// router.get('/has_reward',rewardController.getRedeemReward)
// router.get('/send_email',rewardController.getSendEmail)
 
router.get("/get_reward_by_id/:reward_id", rewardController.getRewardById);

//post request
router.post("/get_reward", rewardController.getReward);
router.post("/redeem_reward", rewardController.getRedeemReward);
router.post("/add_new_reward",upload.single('image'), rewardController.addNewReward);
router.post("/edit_reward_details",[auth.verifyAccessToken,upload.single('image')],rewardController.editRewardDetails)
router.post("/get_reward_by_time_and_group",rewardController.getRewardByEventTimeAndCustomerGroup)

module.exports = router;
