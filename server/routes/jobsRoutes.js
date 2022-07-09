const express = require("express");
const router = express.Router();

const { createJobController } = require('../controllers/jobsController')
const ensureAuth = require("../middleware/requireLoginJwt");

router.post("/jobs/create-job", ensureAuth, createJobController);

module.exports = router;
