const cmsCtl = require('../controllers/cms');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /**
     * Admin only
     */
    app.put('/cms/review', AdminOnly, cmsCtl.userReview);
    app.get('/cms/user_list', AdminOnly, cmsCtl.userList);
    app.post('/cms/announcement', AdminOnly, cmsCtl.announcement);
};