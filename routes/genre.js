const genreCtl = require('../controllers/genre');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /**
     * Admin only
     */
    app.post('/genre/add', AdminOnly, genreCtl.create);
    app.get('/genre/list', AdminOnly, genreCtl.list);
};