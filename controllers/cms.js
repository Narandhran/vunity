const { userReview, userList } = require('../services/cms');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    userReview: (req, res) => {
        userReview(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    userList: (req, res) => {
        userList(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
};