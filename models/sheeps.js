const mongoose = require('mongoose');

const sheepSchema = new mongoose.Schema({
    tag: {type: Number, required: true, unique: true},
    checkDigit: {type: Number, required: true},
    breedCount: {type: Number, required: false},
    lastTimeCalved: {type: Date, required: false},
    dateOfLastSanitation: {type: Date, required: false},
    comments: {type: String, required: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Sheep', sheepSchema);
