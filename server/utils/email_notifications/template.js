
const jobNotificationTemplate = (jobDetails, user) => {
    return `
        Hey <b>${user.firstName}</b>,<br><br>
        We have a new job for you!<br>
        Job Title:- <b>${jobDetails.jobTitle}</b><br>
        Posted by:- <b>${jobDetails.companyName}</b>
        <br>
        <br>
        To apply for this job, please click on the link below:<br>
        <p style="text-align: center;">
            <a href="${jobDetails.applyLink}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px; font-weight: 600;">
                Apply Now
            </a>
        </p>
        <br>
        <br>
        Thank you,<br>
        <b>localhostAncore Team</b>
    `;
}


const emailVerificationTemplate = (user, verificationLink) => {
    return `
        Hey <b>${user.firstName}</b>,<br><br>
        Please verify your email by clicking the link below:<br>
        <p style="text-align: center;">
            <a href="${verificationLink}" style="box-sizing:border-box;border-color:#348eda;font-weight:400;text-decoration:none;display:inline-block;margin:0;color:#ffffff;background-color:#348eda;border:solid 1px #348eda;border-radius:2px;font-size:14px;padding:12px 45px; font-weight: 600;">
                Verify Email
            </a>
        </p>
        <br>
        <br>
        Thank you,<br>
        <b>localhostAncore Team</b>
    `;
}



module.exports = {
    jobNotificationTemplate,
    emailVerificationTemplate
}