const { model, Schema } = require('mongoose');
var vunitySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
        type: [String],
        default: []
    },
    vedha_adhyayanam: {
        type: [String],
        default: []
    },
    shadanga_adhyayanam: {
        type: Boolean,
        default: false
    },
    shastra_adhyayanam: {
        type: [String],
        default: []
    },
    prayogam: {
        type: [String],
        default: []
    },
    marital_status: {
        type: String,
        default: null
    },
    mother_tongue: {
        type: [String],
        default: []
    }
}, { timestamps: true });

vunitySchema.plugin(require('mongoose-unique-validator'));
var Vunity = model('vunity', vunitySchema);
module.exports = { Vunity };