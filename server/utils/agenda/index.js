const Agenda = require('agenda')
const dbURL = process.env.MONGO_URI

const agenda = new Agenda({
    db: {address: dbURL, collection: 'Agenda'},
    processEvery: '24 hours',
    useUnifiedTopology: true
})

module.exports = agenda