const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const State = require("./../models/State");

const ensureAuth = require("./../middleware/requireLoginJwt");
const axios = require("axios");

// all routes here are starting with /buildProfile

router.post("/", ensureAuth, async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, qualification, pincode } = req.body;
        
        if (!firstName || !lastName || !dateOfBirth || !qualification || !pincode)  {
            return res.status(422).json({ error: "please add all the fields" });
        }
        
        const savedUser = req.user;

        const pincodeData = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)

        const stateName = pincodeData.data[0].PostOffice[0].State;

        const searchState = await State.findOne({stateName})
        let newState
        if(searchState){
            searchState.noOfApplicants++;
            searchState.save()
        }else{
            newState = new State({
                stateName,
                noOfApplicants: 1
            })
            newState.save()
        }


        savedUser.firstName = firstName;
        savedUser.lastName = lastName;
        savedUser.dateOfBirth = dateOfBirth;
        savedUser.qualification = qualification;
        savedUser.pincode = pincode;
        savedUser.state = stateName

        savedUser.save((err)=>{
            if(err){
                res.status(500).json({ message: "Mongo Error"})
            }
        });
        res.status(201).json({ message: "Profile Updated!" });

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
