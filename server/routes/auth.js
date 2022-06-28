const express = require("express");
const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./../models/User");
const State = require("./../models/State");
const ensureAuth = require("./../middleware/requireLoginJwt");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// all routes here are starting with /auth

router.get("/protected", ensureAuth, (req, res) => {
    res.send("Hello world");
});

router.post("/register", async (req, res) => {
    try {
        const { email, password, isAdmin, organizationName } = req.body;
        if (!email || !password)  {
            return res.status(422).json({ error: "please add all the fields" });
        }
        const savedUser = await User.findOne({ email });

      
        if (savedUser) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedpassword,
            isAdmin,
            organizationName
        });

        newUser.save((err)=> {
            if(err){
                return res.status(500).json({ error: "Mongo Error"})
            }
        });
        res.status(201).json({ message: "Registered!" });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please add email or password" });
        }

        const savedUser = await User.findOne({ email })
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or password" });
        }

        const passwordDoMatch = await bcrypt.compare(password, savedUser.password)

        if (passwordDoMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            return res.json({
                message: "User successfully signin",
                token,
                user: savedUser,
            });
        } else {
            return res.status(422).json({ error: "Invalid Email or password" });
        }

    } catch (err) {
        res.status(500).json(err);

    }

});

// Send user data with respect to the token received
router.post("/me", ensureAuth, async (req, res) => {
    return res.status(200).json(req.user);
});

router.post("/build-profile", ensureAuth, async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, qualification, pincode } = req.body;
        
        if (!firstName || !lastName || !dateOfBirth || !qualification || !pincode)  {
            return res.status(422).json({ error: "please add all the fields" });
        }
        
        const savedUser = req.user;

        if(savedUser.isAdmin){
            return res.status(403).json({error: "registered user dont have access to build profile"})
        }

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
                return res.status(500).json({ message: "Mongo Error"})
            }
        });
        res.status(201).json({ message: "Profile Updated!" });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
