const libraryCtl = require('../controllers/library');
const { AdminOnly, AllUsers } = require('../utils/auth.util');
const { listByGener } = require('../services/library');

module.exports = app => {

    /**
     * Admin Only
     */
    app.post('/library/create', AdminOnly, libraryCtl.create);
    app.put('/library/update/:id', AdminOnly, libraryCtl.updateById);
    app.put('/library/update_thumb/:id', AdminOnly, libraryCtl.updateThumbnail);
    app.put('/library/update_book/:id',AdminOnly,libraryCtl.updateBook);

    /**
     * All Users
     */
    app.post('/library/get_one', libraryCtl.getById);
    app.get('/library/list_recent', libraryCtl.getRecent);
    app.get('/library/list_category/:id', libraryCtl.listByCategory);
    app.get('/library/homepage', libraryCtl.genreBasedList);
    app.get('/library/search/:search', libraryCtl.searchFilter);
    app.get('/library/list', libraryCtl.listAll);
    app.get('/library/list_genre/:genre',libraryCtl.listByGener);
};
