const categoryCtl = require('../controllers/category');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    /**
     * Admin only
     */
    app.post('/category/create', AdminOnly, categoryCtl.create);
    app.put('/category/update/:id', AdminOnly, categoryCtl.updateById);
    app.put('/category/update_thumb/:id', AdminOnly, categoryCtl.updateThumbnail);
    /**
     * All users
     */
    app.get('/category/list', categoryCtl.list);
    app.post('/thumb',categoryCtl.updateThumb);
};