const { model, Schema } = require('mongoose');

var categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        unique: true
    },
    description: {
        type: String,
        required: false,
        maxlength: 100
    },
    thumbnail: {
        type: String,
        maxlength: 32,
        required: true
    }
}, { timestamps: true });

categorySchema.plugin(require('mongoose-unique-validator'));
var Category = model('category', categorySchema);
module.exports = { Category };