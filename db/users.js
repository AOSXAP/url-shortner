const mongoose = require('mongoose');

Schema = mongoose.Schema;

const user = new Schema({
    email: { type: String, unique: true},
    pass: { type: String, unique: false},
    user_name: { type: String, unique: false},
});

const users = mongoose.model('users', user)

module.exports = users;