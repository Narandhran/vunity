const { model, Schema } = require('mongoose');

var recentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    libraryId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });
var Recent = model('recent', recentSchema);
module.exports = { Recent };