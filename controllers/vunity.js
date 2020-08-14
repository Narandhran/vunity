const { findByUserId, create, update, updatePhoto } = require('../services/vunity');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    create: (req, res) => {
        create(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', {});
        });
    },
    findByUserId: (req, res) => {
        findByUserId(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    update: (req, res) => {
        update(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Updated successfully', {});
        });
    },
    updatePhoto: (req, res) => {
        updatePhoto(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Updated successfully', {});
        });
    },
};

