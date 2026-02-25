const mongoose = require('mongoose');

const sheepSchema = new mongoose.Schema({
    tag: {type: Number, required: true, unique: true},
    checkDigit: {type: Number, required: true},
    birthDate: {type: Date, required: false},
    breedCount: {type: Number, required: false},
    lastTimeCalved: {type: Date, required: false},
    dateOfLastSanitation: {type: Date, required: false},
    comments: {type: String, required: false},
    createdAt: {type: Date, default: Date.now},
    // Sync fields (versioning & conflict resolution)
    version: {type: Number, default: 1},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date, default: null},
    // Local reference for sync tracking
    localId: {type: String, required: false}
});

sheepSchema.index({ updatedAt: 1 });
sheepSchema.index({ deletedAt: 1 });

module.exports = mongoose.model('Sheep', sheepSchema);
