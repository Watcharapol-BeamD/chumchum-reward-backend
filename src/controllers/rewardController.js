require("dotenv").config();
const { db } = require("../../db");
const queries = require("../queries/queries.js");
const rewardQueries = require("../queries/RewardQueries.js");
const customerQueries = require("../queries/CustomerQueries.js");
const adminQueries = require("../queries/adminQueries.js");

const deleteFileFromBackend = require("../services/deleteUploadedImage.js");
const { sendEmail } = require("../services/emailService");
const {
  sendLineMessage,
  sendCouponLineMessage,
} = require("../services/lineMessageService.js");
const ftpService = require("../services/ftpService.js");
const { default: ShortUniqueId } = require("short-unique-id");

// ----------------------FTP--------------------------
const ftp = require("basic-ftp");
const fs = require("fs");

// -------------------------------------------------

//-------------Reward Controller--------------------------

const getReward = async (req, res) => {
  try {
    const results = await db.query(rewardQueries.getRewardView);

    const transformedData = results[0].map((row) => ({
      reward_id: row.reward_id,
      name: row.name,
      description: row.description,
      quantity: row.quantity,
      require_point: row.require_point,
      status: row.status,
      event_start_date: row.event_start_date,
      event_end_date: row.event_end_date,
      reward_image: row.reward_image,
      customer_group_id: row.customer_group_id
        .split(", ")
        .map((group) => group.trim()),
      customer_group_name: row.customer_group_name
        .split(", ")
        .map((group) => group.trim()),
    }));

    res.status(200).json(transformedData);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRewardById = async (req, res) => {
  const { reward_id } = req.params;

  try {
    const results = await db.query(rewardQueries.getRewardById, [reward_id]);
    // const reward = results[0][0];

    const transformedData = results[0].map((row) => ({
      reward_id: row.reward_id,
      name: row.name,
      description: row.description,
      quantity: row.quantity,
      require_point: row.require_point,
      status: row.status,
      event_start_date: row.event_start_date,
      event_end_date: row.event_end_date,
      reward_image: row.reward_image,
      reward_type: row.reward_type,
      customer_group_id: row.customer_group_id
        .split(", ")
        .map((group) => parseInt(group.trim(), 10)),
      customer_group_name: row.customer_group_name
        .split(", ")
        .map((group) => group.trim()),
    }));

    res.status(200).json(transformedData[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRewardByEventTimeAndCustomerGroup = async (req, res) => {
  const { customerGroupId } = req.body;
  try {
    const results = await db.query(
      rewardQueries.getRewardsByEventTimeAndCustomerGroupView,
      [customerGroupId]
    );
    return res.status(200).send(results[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRedeemReward = async (req, res) => {
  const {
    customer_id,
    reward_id,
    quantity,
    points_used,
    reward_name, //ใช้แค่ตอนส่ง mail
    bplus_code, //ใช้แค่ตอนส่ง mail
    retailer_name, //ใช้แค่ตอนส่ง mail
    reward_type,
  } = req.body;

  try {
    // Check if the user already exists in the database
    const userExistsResult = await db.query(customerQueries.getCheckUserExist, [
      customer_id,
    ]);

    const existingUserCount = userExistsResult[0][0].count;

    if (existingUserCount > 0) {
      // Insert the redeem reward into the database.
      await db.query(rewardQueries.keepRewardToHistory, [
        customer_id,
        reward_id,
        quantity,
        points_used,
      ]);

      // ------------------- Decrease point--------------------------
      db.query(customerQueries.decreasePoint, [points_used, customer_id]);
      // ------------------- Decrease reward-------------------------
      db.query(rewardQueries.decreaseReward, [quantity, reward_id]);

      //------------get retailer name by customer_id-----------------
      //------------get timestamp from database before send email----
      const redeem_timestamp_result = await db.query(
        rewardQueries.getRedeemRewardTimestamp,
        [customer_id]
      );
      const redeem_timestamp = redeem_timestamp_result[0][0].redeem_timestamp;

      //---------------------get reward image------------------------
      const reward_image_result = await db.query(rewardQueries.getRewardImage, [
        reward_id,
      ]);
      const reward_image = reward_image_result[0][0].reward_image;

      //-----------------------send email-----------------------

      await sendEmail(
        retailer_name,
        bplus_code,
        reward_name,
        redeem_timestamp,
        reward_image
      );

      //------------------------push line message----------------
      //customer_id ต้องเป็นของ line
      await sendLineMessage(customer_id, reward_image, reward_name).then(() => {
        console.log("Line message send successfully");
      });

      //------------------ Reward with type coupon -------------------
      if (reward_type === "COUPON") {
        const couponStatus = 1; //status 1=activate
        const [couponCodeItem] = await db.query(rewardQueries.getCouponCode, [
          reward_id,
        ]);

        if (couponCodeItem.length !== 0) {
          const coupon = couponCodeItem[0].coupon_code;
          await db.query(rewardQueries.updateCouponStatus, [
            couponStatus,
            coupon,
          ]);

          await sendCouponLineMessage(customer_id, coupon).then(() => {
            console.log("Line message send successfully");
          });
        } else {
          res.status(404).json({ msg: "ไม่พบคูปอง", isRedeemSuccess: false });
        }
      }

      res.status(201).json({ msg: "redeem successful", isRedeemSuccess: true });
    } else {
      res.status(404).json({
        msg: "Redemption Failed: User Not Found",
        isRedeemSuccess: false,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRemainReward = async (req, res) => {
  const { reward_id } = req.query;

  try {
    const checkHasReward = await db.query(
      rewardQueries.getRewardRemainQuantity,
      [reward_id]
    );

    res.json(checkHasReward.rows[0].reward_id);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("An error occurred while processing your request." + err);
  }
};

const getSendEmail = async (req, res) => {
  console.log("wrong");
};

const addNewReward = async (req, res) => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const generateName = randomUUID();

  // Get the path to the uploaded file
  const filePath = req.file.path;
  //concat image name to prevent image name duplicate.
  const fileName = generateName + "_" + req.file.originalname;

  const {
    adminId,
    rewardName,
    requirePoints,
    customerGroupId,
    quantity,
    status,
    startDate,
    endDate,
    description,
    rewardType,
  } = req.body;

  try {
    //get insert reward and get rewardId, insertId = id same as auto increment id
    const insertValue = await db.query(rewardQueries.addNewReward, [
      rewardName,
      requirePoints,
      // customerGroup,
      quantity,
      status,
      startDate,
      endDate,
      description,
      rewardType,
      fileName,
    ]);

    //add customer group to reward.
    customerGroupId.map(async (value) => {
      await db.query(rewardQueries.addCustomerGroupToReward, [
        insertValue[0].insertId,
        value,
      ]);
    });

    //add history && insertValue[0].insertId is reward id
    const rewardId = insertValue[0].insertId;
    await db.query(adminQueries.adminActionToReward, [
      "CREATE",
      adminId,
      rewardId,
    ]);

    ftpService.uploadImageToHost(filePath, fileName);
    // Handle success
    res
      .status(200)
      .send({ msg: "Add new reward successfully.", isFinish: true });
  } catch (error) {
    // Handle error
    console.error(error);
    res.status(500).send("Error while add new reward.");
  }
};

const editRewardDetails = async (req, res) => {
  const { randomUUID } = new ShortUniqueId({ length: 10 });
  const generateName = randomUUID();

  const {
    adminId,
    rewardName,
    requirePoints,
    customerGroupId,
    quantity,
    status,
    startDate,
    endDate,
    description,
    rewardType,
    rewardId,
    imageName,
    oldImageName,
    groupToRemove,
  } = req.body;

  //-------------New-------------------
  // Remove Group
  const removeGroup = () => {
    if (groupToRemove === undefined) {
      return Promise.resolve(); // Return a resolved Promise if there's nothing to remove
    }

    const removePromises = groupToRemove.map(async (value) => {
      await db.query(rewardQueries.removeCustomerGroupFromReward, [
        rewardId,
        parseInt(value, 10),
      ]);
    });

    return Promise.all(removePromises);
  };

  removeGroup()
    .then(() => {
      // Update new group
      const addPromises = customerGroupId.map(async (value) => {
        await db.query(rewardQueries.addCustomerGroupToReward, [
          rewardId,
          parseInt(value, 10),
        ]);
      });

      return Promise.all(addPromises);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  //------------------------------------

  //-----------------------if update details with image-----------------------
  //Check has image if has do this function
  if (req.file !== undefined) {
    // Get the path to the uploaded file
    const filePath = req.file.path;
    //concat image name to prevent image name duplicate.
    const fileName = generateName + "_" + req.file.originalname;

    //--delete old image--
    ftpService.deleteFileFromHost(oldImageName);
    //--------------------

    try {
      //add to history
      await db.query(adminQueries.adminActionToReward, [
        "UPDATE",
        adminId,
        rewardId,
      ]);
      await db.query(rewardQueries.updateRewardDetailsAndImage, [
        rewardName,
        requirePoints,
        // customerGroup,
        quantity,
        status,
        startDate,
        endDate,
        description,
        rewardType,
        fileName,
        rewardId,
      ]);

      console.log("-----------upload");
      ftpService.uploadImageToHost(filePath, fileName).then(() => {
        return res
          .status(200)
          .send({ msg: "Update reward details successfully.", isFinish: true });
      });
    } catch (error) {
      // Handle error
      console.error(error);
      return res.status(500).send("Error while update reward details.");
    }
  } else {
    //-----------------------if update details no image-----------------------
    try {
      //add to history
      await db.query(adminQueries.adminActionToReward, [
        "UPDATE",
        adminId,
        rewardId,
      ]);

      await db.query(rewardQueries.updateRewardDetails, [
        rewardName,
        requirePoints,
        // customerGroup,
        quantity,
        status,
        startDate,
        endDate,
        description,
        rewardType,
        rewardId,
      ]);

      return res
        .status(200)
        .send({ msg: "Update reward details successfully.", isFinish: true });
    } catch (error) {
      // Handle error
      console.error(error);
      return res.status(500).send("Error while update reward details.");
    }
    //---------------------------------------------------------------------------}
  }
};

const addNewCouponCode = async (req, res) => {
  const couponList = req.body;

  try {
    for (const item of couponList) {
      // Check if the coupon code already exists
      const [existingCoupon] = await db.query(
        rewardQueries.checkIsCouponExist,
        [item.CouponCode]
      );

      if (existingCoupon.length > 0) {
        return res
          .status(409)
          .send(`Duplicate coupon code detected: ${item.CouponCode}`);
      }

      // Add the new coupon code
      await db.query(rewardQueries.addCoupon, [item.CouponCode, item.RewardID]);
    }

    res.status(200).send("Coupon codes added successfully.");
  } catch (error) {
    console.error("Error adding coupon codes:", error);
    res.status(500).send({
      isUploadCSVError: true,
      csvMsg: "An error occurred while adding coupon codes.",
    });
  }
};

module.exports = {
  getRedeemReward,
  getSendEmail,
  getRemainReward,
  getReward,
  getRewardById,
  addNewReward,
  editRewardDetails,
  getRewardByEventTimeAndCustomerGroup,
  addNewCouponCode,
};
