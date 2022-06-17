const express = require('express')
const { sendJobNotificationEmail } = require('../utils/email_notifications/main')
const router = express.Router()
const ensureAuth = require('./../middleware/requireLoginJwt')

router.get("/notify", async (req, res) => {
    const user = {
        firstName: "Rahul",
        email: "rahultwr0005@gmail.com"
    }
    const jobDetails = {
        jobTitle: "Software Engineer",
        companyName: "Google",
        applyLink: "https://www.google.com"
    }
    const message = await sendJobNotificationEmail(user, jobDetails);
    console.log("msg: ", message);
    res.status(200).json(message);
})

module.exports = router