const { model, Schema } = require('mongoose');

var librarySchema = new Schema({
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
        required: true
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
        maxlength: 300
    },
    keywords: {
        type: [String],
        required: false
    }
}, { timestamps: true });

var Library = model('library', librarySchema);
module.exports = { Library };