const videoCtl = require('../controllers/video');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {

    /**
     * Admin Only
     */
    app.post('/video/create', AdminOnly, videoCtl.create);
    app.put('/video/update/:id', AdminOnly, videoCtl.updateById);
    app.put('/video/update_thumb/:id', AdminOnly, videoCtl.updateThumbnail);

    /**
     * All Users
     */
    app.post('/video/get_one', AllUsers, videoCtl.getById);
    app.get('/video/list_recent', AllUsers, videoCtl.getRecent);
    app.get('/video/list_category/:id', AllUsers, videoCtl.listByCategory);
    app.get('/video/homepage', AllUsers, videoCtl.genreBasedList);
    app.get('/video/search/:search', AllUsers, videoCtl.searchFilter);
    app.get('/video/list', AllUsers, videoCtl.listAll);
    app.get('/video/list_genre/:genre', AllUsers, videoCtl.listByGener);
};
