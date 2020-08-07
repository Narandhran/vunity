const { Favourite } = require('../models/favourite');

module.exports = {
    addToFavourite: async (request, cb) => {
       await Favourite.create({ 'userId': request.verifiedToken._id, 'libraryId': request.params.id }
            , (err, result) => {
                cb(err, result);
            });
    },
    removeFromFavourite: async (request, cb) => {
       await Favourite.findOneAndRemove({'userId': request.verifiedToken._id,'libraryId':request.params.id})
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listByUser: async (request, cb) => {
        await Favourite
            .find({ 'userId': request.verifiedToken._id })
            .populate('libraryId')
            .exec((err, result) => {
                cb(err, result);
            });
    }
};