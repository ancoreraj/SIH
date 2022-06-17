const sgMail = require("@sendgrid/mail");

const { jobNotificationTemplate, emailVerificationTemplate } = require("./template");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// send mail with defined transport object
const sendMail = (message) => {
    sgMail.send(message)
    .then(() => {
        return {
            status: "success",
            message: "Email sent successfully"
        }
    })
    .catch(error => {
        return {
            status: "failure",
            message: "Email sending failed!"
        }
    });
}


// send job notification mail
const sendJobNotificationEmail = async (user, jobDetails) => {
    const message = {
        to: user.email,
        from: process.env.SENDER_EMAIL,
        subject: `Job Alert | ${jobDetails.jobTitle} | Apply Now`,
        html: jobNotificationTemplate(jobDetails, user),
    }

    return sendMail(message);
}


// send email verification mail
const sendEmailVerificationEmail = async (user, verificationLink) => {
    const message = {
        to: user.email,
        from: process.env.SENDER_EMAIL,
        subject: "Verify your email",
        html: emailVerificationTemplate(user, verificationLink),
    }

    return sendMail(message);
}



module.exports = {
    sendJobNotificationEmail,
    sendEmailVerificationEmail
}