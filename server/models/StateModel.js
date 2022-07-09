const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: true
    },
    noOfApplicants: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('State', stateSchema)
