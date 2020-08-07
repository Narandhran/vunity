const bannerCtl = require('../controllers/banner');
const { AdminOnly } = require('../utils/auth.util');

module.exports = app => {
    /**
     * Admin only
     */
    app.post('/banner/create', AdminOnly, bannerCtl.create);
    app.put('/banner/update/:id', AdminOnly, bannerCtl.updateBanner);

    /**
     * All users
     */
    app.get('/banner/list', bannerCtl.list);
};