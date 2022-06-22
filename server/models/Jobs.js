const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    postDate: {
        type: Date,
        required: true
    },
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
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
