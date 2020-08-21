const { City } = require('../models/city');

module.exports = {
    search: async (request, cb) => {
        City.find({
            'city': {
                '$regex': new RegExp(request.params.search),
                '$options': 'i'
            }
        }).exec((err, result) => {
            cb(err, result);
        });
    }
};