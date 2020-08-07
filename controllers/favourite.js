const { addToFavourite, removeFromFavourite, listByUser } = require('../services/favourite');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    addToFavourite:(req, res) => {
        addToFavourite(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Successfully added', {});
        });
    },
    removeFromFavourite: (req, res) => {
        removeFromFavourite(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'removed successfully', {});
        });
    },
    listByUser: (req, res) => {
        listByUser(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Successfully', result);
        });
    }
};