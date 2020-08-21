const { search } = require('../services/city');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    search:  (req, res) => {
        search(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
};