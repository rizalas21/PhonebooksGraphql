const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
    name: String,
    phone: String,
    avatar: String
}, {timestamps: true});

module.exports = model('contact', contactSchema);