const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    qualification: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    pinCode: {
        type: Number,
    },
    state: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
