const { model, Schema } = require('mongoose');

var genreSchema = new Schema({
    genre: {
        type: String,
        required: true
    }
}, { timestamps: false });

var Genre = model('genre', genreSchema);

module.exports = { Genre };