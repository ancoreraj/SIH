const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const StateModel = require("../models/StateModel");

const JWT_SECRET = process.env.JWT_SECRET;

const registerController = async (req, res) => {
    try {
        const { email, password, isAdmin, organizationName } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "please add all the fields" });
        }
        const savedUser = await UserModel.findOne({ email });


        if (savedUser) {
            return res.status(422).json({ error: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            email,
            password: hashedpassword,
            isAdmin,
            organizationName
        });

        newUser.save((err) => {
            if (err) {
                return res.status(500).json({ error: "Mongo Error" })
            }
        });
        res.status(201).json({ message: "Registered!" });

    } catch (err) {
        res.status(500).json(err);
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please add email or password" });
        }

        const savedUser = await UserModel.findOne({ email })
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email or password" });
        }

        const passwordDoMatch = await bcrypt.compare(password, savedUser.password)

        if (passwordDoMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            return res.json({
                message: "User successfully signin",
                token,
            });
        } else {
            return res.status(422).json({ error: "Invalid Email or password" });
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

const getUserController = (req, res) => {
    return res.status(200).json(req.user);
}

const buildProfileController = async (req, res) => {
    try {
        const { firstName, lastName, dateOfBirth, qualification, pincode } = req.body;

        if (!firstName || !lastName || !dateOfBirth || !qualification || !pincode) {
            return res.status(422).json({ error: "please add all the fields" });
        }

        const savedUser = req.user;

        if (savedUser.isAdmin) {
            return res.status(403).json({ error: "registered user dont have access to build profile" })
        }

        const pincodeData = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)

        const stateName = pincodeData.data[0].PostOffice[0].State;

        const searchState = await StateModel.findOne({ stateName })
        let newState
        if (searchState) {
            searchState.noOfApplicants++;
            searchState.save()
        } else {
            newState = new StateModel({
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

        savedUser.save((err) => {
            if (err) {
                return res.status(500).json({ message: "Mongo Error" })
            }
        });
        res.status(201).json({ message: "Profile Updated!" });

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    registerController,
    loginController,
    getUserController,
    buildProfileController
}