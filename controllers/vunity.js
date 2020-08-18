const { findByUserId, create, update, updatePhoto, list, customFilter, customSearch } = require('../services/vunity');
const { successHandler, errorHandler } = require('../utils/handler');
const { request } = require('express');

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
            else successHandler(req, res, 'Updated successfully', result);
        });
    },
    list: (req, res) => {
        list(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    customFilter: (req, res) => {
        customFilter(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
    customSearch: (req, res) => {
        customSearch(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    },
};

