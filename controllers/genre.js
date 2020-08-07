const {create,list}= require('../services/genre');const { addToFavourite, removeFromFavourite, listByUser } = require('../services/favourite');
const { successHandler, errorHandler } = require('../utils/handler');

module.exports = {
    create: (req,res)=>{
        create(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Successfully added', {});
        });
    },
    list: (req,res)=>{
        list(req, (err, result) => {
            if (err) errorHandler(req, res, err);
            else successHandler(req, res, 'Success', result);
        });
    }
};