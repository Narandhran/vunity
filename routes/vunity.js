const vunityCtl = require('../controllers/vunity');
const { AdminOnly, AllUsers } = require('../utils/auth.util');

module.exports = app => {
    app.post('/vunity/create', AllUsers, vunityCtl.create);
    app.put('/vunity/update/:id', AllUsers, vunityCtl.update);
    app.get('/vunity/get_by_user/:id', AllUsers, vunityCtl.findByUserId);
    app.put('/vunity/update_photo', AllUsers, vunityCtl.updatePhoto);
};