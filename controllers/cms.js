const { userReview, userList, announcement, activeUserReport } = require('../services/cms');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    userReview: (req, res) => {
        userReview(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', {});
        });
    },
    userList: (req, res) => {
        userList(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    announcement: (req, res) => {
        announcement(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    activeUserReport: (req, res) => {
        activeUserReport(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
};