const express = require("express");

const {
    registerController,
    loginController,
    getUserController,
    buildProfileController
} = require('../controllers/authController')

const ensureAuth = require("../middleware/requireLoginJwt");

const router = express.Router();

router.post("/auth/register", registerController);

router.post("/auth/login", loginController);

router.get("/auth/me", ensureAuth, getUserController);

router.post("/auth/build-profile", ensureAuth, buildProfileController);

module.exports = router;
