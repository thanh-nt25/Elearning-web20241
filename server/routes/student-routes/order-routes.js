const express = require("express");
const {
  createFreeCourseOrder,
  createOrder,
  capturePaymentAndFinalizeOrder,
} = require("../../controllers/student-controller/order-controller");

const router = express.Router();

// free-course
router.post("/create-free", createFreeCourseOrder);
router.post("/create", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);

module.exports = router;
