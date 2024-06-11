const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STUDENT_DETAIL_SCHEMA = new Schema({
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },

})

const DATA_SENT = mongoose.model('student', STUDENT_DETAIL_SCHEMA);
module.exports = DATA_SENT;