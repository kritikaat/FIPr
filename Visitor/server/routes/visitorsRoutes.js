const express = require("express");
const router = express.Router();

const {
  submitVisitorForm,
} = require("../controllers/visitorControllers.js");

router.post("/submit-form", submitVisitorForm);


module.exports = router;
