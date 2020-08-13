const { Vunity } = require('../models/vunity');

module.exports = {
    create: async (request, cb) => {
        Vunity.create(request.body, (err, result) => {
            cb(err, result);
        });
    },
    update: async (request, cb) => {
        Vunity
            .findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    findByUserId: async (request, cb) => {
        Vunity
            .findOne({ user_id: request.params.id })
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    list: async (request, cb) => {
        Vunity
            .find({})
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    }
};