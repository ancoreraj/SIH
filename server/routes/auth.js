const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const ensureAuth = require("./../middleware/requireLoginJwt");

// all routes here are starting with /auth

router.get("/protected", ensureAuth, (req, res) => {
    res.send("Hello world");
});

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        
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
        });

        newUser.save();
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

module.exports = router;
