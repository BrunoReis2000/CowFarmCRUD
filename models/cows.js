const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
    image: {type: String, required: false},
    tag: {type: Number, required: true},
    weight: {type: Number, required: true},
    breedCount: {type: String, required: true},
    lastTimeCalved: {type: Date, required: false}, 
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cow', cowSchema);