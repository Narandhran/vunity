const donationCtrl = require('../controllers/donation');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /** All users */
    app.post('/donation/donate', AllUsers, donationCtrl.donate);
    app.post('/donation/verify', AllUsers, donationCtrl.paymentVerification);
};