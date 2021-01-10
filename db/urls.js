const mongoose = require('mongoose');

Schema = mongoose.Schema;

const url = new Schema({
    actualurl: { type: String, unique: false },
    user_id: { type: String, unique: true },
    url_name: { type: String, unique: false, default: "Link" }
});

const urls = mongoose.model('urls', url)

module.exports = urls;