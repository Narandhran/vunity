const { model, Schema } = require('mongoose');

var videoSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 36
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    genre: {
        type: [String],
        required: true
    },
    author: {
        type: String,
        required: false
    },
    yearOfPublish: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
        maxlength: 500
    },
    keywords: {
        type: [String],
        required: false
    },
    makeAnnouncement: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

var Video = model('video', videoSchema);
module.exports = { Video };