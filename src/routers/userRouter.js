const express = require("express");
const router = express.Router();
const userController = require("../controllers2/userController");
const auth = require('../middleware/auth')
 
//get request
router.get("/", userController.getAllUser);
 

//post request
router.post("/register", userController.getRegisterNewCustomer);
router.post("/is_register", userController.getIsRegister);
router.post('/get_customer_by_id',userController.getCustomerById) 
router.post('/edit_customer_info',userController.updateCustomerInformation)
router.post("/refresh_token" ,auth.verifyRefreshToken,userController.getRefreshToken)
// router.post("/redeem_reward", userController.getRedeemReward);


module.exports = router;
