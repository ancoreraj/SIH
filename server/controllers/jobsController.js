const JobsModel = require("../models/JobsModel");

const createJobController = async (req, res) => {
    try {
        const { title, qualification, lastDate, applyLink, maxAge } = req.body;

        if (!title || !qualification || !lastDate || !applyLink || !maxAge) {
            return res.status(422).json({ error: "please add all the fields" });
        }

        const savedUser = req.user;

        if (savedUser.isAdmin === false) {
            return res.status(403).json({ error: "registered user don't have access to post jobs" })
        }
        
        const newJob = new JobsModel({
            title,
            qualification,
            lastDate,
            applyLink,
            postedBy: savedUser,
            maxAge
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