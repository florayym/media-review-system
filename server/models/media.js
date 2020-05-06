const mongoose = require('mongoose')
const mediaSchema = require('../schemas/media')

module.exports = mongoose.model('Media', mediaSchema);