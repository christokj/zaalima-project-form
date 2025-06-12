const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
