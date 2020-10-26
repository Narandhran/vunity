const { model, Schema } = require('mongoose');

var favouriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    libraryId: {
        type: Schema.Types.ObjectId,
        ref: 'library',
        required: true,
        default: null
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'video',
        required: true,
        default: null
    },
    isBookmark: {
        type: Boolean,
        default: true
    },
    hint: {
        type: String,
        required: false,
        maxlength: 36
    }
}, { timestamps: true });
var Favourite = model('favourite', favouriteSchema);
module.exports = { Favourite };