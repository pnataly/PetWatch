const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activityLogSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet',
        required: true
    },
    actionType: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = { ActivityLog, activityLogSchema};
