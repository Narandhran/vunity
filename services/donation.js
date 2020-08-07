const { Donation } = require('../models/donation');
const { User } = require('../models/user');
const { createPayment, verify } = require('./custom/razorpay.service');
const { alphaNumeric, autoIdGen, onlyNumber } = require('../utils/autogen');
const { uri } = require('../utils/constant').smsGateWay;
const axios = require('axios').default;
const { json } = require('body-parser');

module.exports = {
    donate: async (request, cb) => {
        let donateObj = request.body;
        donateObj.userId = request.verifiedToken._id;
        donateObj.receipt = autoIdGen(8, alphaNumeric);
        await createPayment(donateObj, async (err, result) => {
            if (err) cb(new Error('Attempt failed, try again', {}));
            else {
                let persisted = { ...donateObj, ...result };
                await Donation.create(persisted, async (err, result) => {
                    cb(err, { id: result.id, amount: result.amount });
                });
            }
        });
    },
    paymentVerification: async (request, cb) => {
        let { razorpay_order_id, razorpay_payment_id, razorpay_signature } = request.body;
        let isVerified = await verify(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        let isUser = await User.findById(request.verifiedToken._id);
        if (isVerified) {
            await Donation
                .findOneAndUpdate({
                    'id': razorpay_order_id
                }, {
                    'isPaymentSuccess': true
                }, { new: true });
            await axios.get(uri(isUser.mobile, `Hi ${isUser.fullname}, Your little contribution is more important to us. Because it'll motivate us to do more things. Thanks for your donation, have a great day, Team SWADHARMAA.`));
            cb(null, 'Success');
        }
        else cb(new Error('Payment verification failed, try again', {}));
    },
};