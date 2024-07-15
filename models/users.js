const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    items:{
        type: [String],
        required: true,
        default: []
    },
    additional_info: {
        type: [String],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('UserSchema', schema)