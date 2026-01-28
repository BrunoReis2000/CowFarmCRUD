const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
    tag: {type: String, required: true, unique: true},
    checkDigit: {type: Number, required: true},
    race: {type: String, required: true},
    breedCount: {type: Number, required: false},
    lastTimeCalved: {type: Date, required: false},
    lastTimeSanitized: {type: Date, required: false},
    comments: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cow', cowSchema);
