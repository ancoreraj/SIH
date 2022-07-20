const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    qualification: {
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
    maxAge: {
        type: Number
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Jobs', jobsSchema)
