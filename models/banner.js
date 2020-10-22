const { model, Schema } = require('mongoose');

var bannerSchema = new Schema({
    banner: {
        type: String,
        maxlength: 32,
        required: true
    },
    video: {
        type: String,
        default: null
    },
    index: {
        type: Number
    }
}, { timestamps: true });

var Banner = model('banner', bannerSchema);
module.exports = { Banner };