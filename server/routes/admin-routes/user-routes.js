const express = require("express");
const {
  addNewUser,
  getAllUsers,
  getUserDetailsByID,
  updateUserByID,
  deleteUserByID
} = require("../../controllers/admin-controller/user-controller");
const router = express.Router();

router.post("/add", addNewUser);
router.get("/get", getAllUsers);
router.get("/get/details/:id", getUserDetailsByID);
router.put("/update/:id", updateUserByID);
router.delete("/delete/:id", deleteUserByID);

module.exports = router;
