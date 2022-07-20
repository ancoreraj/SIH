const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    qualification: {
        type: String,
    },
    organizationName: {
        type: String,
    },
    lastDate: {
        type: Date,
    },
    applyLink: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    maxAgeToApply: {
        type: Number
    }
},
    {
        timestamps: true, 
        //createdAt:
        //updatedAt:
    }
)

module.exports = mongoose.model('Jobs', jobsSchema)
