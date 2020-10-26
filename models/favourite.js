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
        default: null
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'video',
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
    },
    isVideo: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
var Favourite = model('favourite', favouriteSchema);
module.exports = { Favourite };