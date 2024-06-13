const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Name is required'],
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        max: 1024,
        min: 6
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
