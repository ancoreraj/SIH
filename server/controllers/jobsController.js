const JobsModel = require("../models/JobsModel");

const createJobController = async (req, res) => {
    try {
        const { title, qualification, lastDate, applyLink, maxAgeToApply } = req.body;

        if (!title || !qualification || !lastDate || !applyLink || !maxAgeToApply) {
            return res.status(422).json({ error: "please add all the fields" });
        }

        const savedUser = req.user;

        if (savedUser.isAdmin === false) {
            return res.status(403).json({ error: "You don't have access to post jobs" })
        }
        
        const newJob = new JobsModel({
            title,
            qualification,
            organizationName: savedUser.organizationName,
            lastDate,
            applyLink,
            postedBy: savedUser,
            maxAgeToApply
        })

        await newJob.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Mongo Error" })
            }
        });

        savedUser.jobs.push(newJob);

        await savedUser.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Mongo Error" })
            }
        });
        res.status(201).json({ message: "Job created sucessfully!" });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createJobController
}