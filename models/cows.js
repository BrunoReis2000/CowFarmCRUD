const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
    image: {type: String, required: false, default: '../uploads/default-cow.jpg'},
    tag: {type: Number, required: true, unique: true},
    weight: {type: Number, required: true},
    breedCount: {type: Number, required: true},
    lastTimeCalved: {type: Date, required: false}, 
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Cow', cowSchema);