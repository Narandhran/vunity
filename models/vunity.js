const { model, Schema } = require('mongoose');
var vunitySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    isMobileVisible: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: null
    },
    mobile: {
        type: String,
        maxlength: 10,
        required: [true, 'Mobile number is mandatory'],
        unique: true
    },
    city: {
        type: String,
        default: null
    },
    vedham: {
        type: String,
        default: null
    },
    samprdhayam: {
        type: String,
        default: null
    },
    shakha: {
        type: String,
        default: null
    },
    vedha_adhyayanam: {
        type: String,
        default: null
    },
    shadanga_adhyayanam: {
        type: String,
        default: null
    },
    shastra_adhyayanam: {
        type: String,
        default: null
    },
    prayogam: {
        type: String,
        default: null
    },
    marital_status: {
        type: String,
        default: null
    },
    mother_tongue: {
        type: String,
        default: null
    }
}, { timestamps: true });

vunitySchema.plugin(require('mongoose-unique-validator'));
var Vunity = model('vunity', vunitySchema);
module.exports = { Vunity };