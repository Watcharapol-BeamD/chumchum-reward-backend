const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middleware/auth')
 
//get request
router.get("/", userController.getAllUser);
router.get("/get_customer_group",userController.getCustomerGroup)
router.get("/customer_info", userController.getCustomerInfo);
router.get("/get_retailer_code_info",userController.getRetailerCodeInfo)
 
//post request
router.post("/register", userController.getRegisterNewCustomer);
router.post("/is_register", userController.getIsRegister);
router.post('/get_customer_by_id',userController.getCustomerById) 
router.post('/edit_customer_info',userController.updateCustomerInformation)
router.post("/refresh_token" ,auth.verifyRefreshToken,userController.getRefreshToken)
router.post("/customer_info",userController.getCustomerByPhoneNumber)
router.post("/add_bplus_code",userController.addBPlusCode)
router.post("/update_retailer_info",userController.getEditRetailerName)
 
// router.post("/redeem_reward", userController.getRedeemReward);

 
module.exports = router;
