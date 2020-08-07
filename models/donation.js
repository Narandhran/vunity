const { model, Schema } = require('mongoose');

var donationSchema = new Schema({
    userId: { type: String, required: true, ref: 'user' },
    id: {
        type: String
    },
    currency: {
        type: String,
        default: 'INR'
    },
    receipt: {
        type: String
    },
    payment_capture: {
        type: Boolean,
        default: 1
    },
    notes: {
        type: Array,
    },
    attempts: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number
    },
    isPaymentSuccess: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Donation = model('donation', donationSchema);
module.exports = { Donation };