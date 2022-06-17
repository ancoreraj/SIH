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
    pinCode: {
        type: Number,
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
