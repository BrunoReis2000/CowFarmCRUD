const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
    tag: {type: String, required: true, unique: true},
    checkDigit: {type: Number, required: true},
    birthDate: {type: Date, required: false},
    race: {type: String, required: true},
    breedCount: {type: Number, required: false},
    lastTimeCalved: {type: Date, required: false},
    lastTimeSanitized: {type: Date, required: false},
    comments: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    // Sync fields (versioning & conflict resolution)
    version: {type: Number, default: 1},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date, default: null},
    // Local reference for sync tracking
    localId: {type: String, required: false}
});

cowSchema.index({ updatedAt: 1 });
cowSchema.index({ deletedAt: 1 });

module.exports = mongoose.model('Cow', cowSchema);
