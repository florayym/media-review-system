const mongoose = require('mongoose')

module.exports = new mongoose.Schema (
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        usertype: {type: String, required: true} // senior // junior
    }
);