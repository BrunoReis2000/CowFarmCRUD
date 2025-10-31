const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    breed: {type: String, required: true},
    lastTimeCalved: {type: Date, required: false},
    image: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cow', cowSchema);