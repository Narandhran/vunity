const cityCtrl = require('../controllers/city');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    app.get('/city/search/:search', AllUsers, cityCtrl.search);
};