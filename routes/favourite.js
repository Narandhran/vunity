const favCtl = require('../controllers/favourite');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {

    /**
     * Registered Users
     */
    app.post('/fav/add/:id', AllUsers, favCtl.addToFavourite);
    app.delete('/fav/remove/:id', AllUsers, favCtl.removeFromFavourite);
    app.get('/fav/list', AllUsers, favCtl.listByUser);
};