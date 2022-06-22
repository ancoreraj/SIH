const express = require("express");
const router = express.Router();
const Jobs = require("./../models/Jobs");
const State = require("./../models/State");

const ensureAuth = require("./../middleware/requireLoginJwt");

// all routes here are starting with /jobs

//Post jobs by admin
router.post("/create-job", ensureAuth, async (req, res) => {
    try {
        const { postDate, title, qualification, lastDate, applyLink } = req.body;
        
        if (!postDate || !title || !qualification || !lastDate || !applyLink)  {
            return res.status(422).json({ error: "please add all the fields" });
        }
        
        const savedUser = req.user;

        if(!savedUser.isAdmin){
            return res.status(403).json({ error: "registered user don't have access to post jobs"})
        }

        const newJob = new Jobs({
            postDate,
            title,
            qualification,
            lastDate,
            applyLink,
            postedBy: savedUser
        })

        newJob.save((err)=>{
            if(err){
                return res.status(500).json({ message: "Mongo Error"})
            }
        });

        savedUser.jobs.push(newJob);

        savedUser.save((err)=>{
            if(err){
                return res.status(500).json({ message: "Mongo Error"})
            }
        });
        res.status(201).json({ message: "Job created sucessfully!" });

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
