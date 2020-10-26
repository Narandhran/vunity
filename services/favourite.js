const { Favourite } = require('../models/favourite');

module.exports = {
    addToFavourite: async (request, cb) => {
        let { videoId = null, libraryId = null } = request.body;
        if (request.body.isVideo) {
            libraryId = null;
            videoId = request.body.libraryId;
        }
        await Favourite.create({
            'userId': request.verifiedToken._id, 'videoId': videoId, 'libraryId': libraryId,
            'isVideo': request.body.isVideo
        }
            , (err, result) => {
                cb(err, result);
            });
    },
    removeFromFavourite: async (request, cb) => {
        let query = { 'userId': request.verifiedToken._id };
        if (request.body.isVideo)
            query['videoId'] = request.body.id;
        else
            query['libraryId'] = request.body.id;
            console.log(query);
        await Favourite.findOneAndRemove(query)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listByUser: async (request, cb) => {
        await Favourite
            .find({ 'userId': request.verifiedToken._id })
            .populate('libraryId')
            .populate('videoId')
            .exec((err, result) => {
                cb(err, result);
            });
    }
};