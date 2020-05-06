const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

db.once('open', function() {
    // Once our connection opens, our callback will be called
})

module.exports = db