const { donate,paymentVerification } = require('../services/donation');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    donate: (req, res) => {
        donate(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Order created successfully', result);
        });
    },
    paymentVerification: (req, res) => {
        paymentVerification(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Payment verified successfully', result);
        });
    }
};