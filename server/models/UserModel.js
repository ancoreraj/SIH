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
    organizationName: {
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
    pincode: {
        type: Number,
    },
    state: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs',
        default: []
    }]
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
