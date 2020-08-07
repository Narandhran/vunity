const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /** All Users */
    app.get('/about', (req, res) => {
        res.send({
            status: 200,
            message: 'Success',
            data: 'There is separate dharma for everyone in our Dharma. They are called Swadharmam. Educational education is based on proper understanding. Our mission is to educate the Swadharmam. We are acting in different ways with the same purpose.',
            contentFound: true
        });
    });
};