const { Video } = require('../models/video');
const { Favourite } = require('../models/favourite');
const { loadMulter } = require('../services/custom/multers3.service');
const { sendFcmMessagePromise } = require('./custom/fcm.service');
const { announcement_topic } = require('../utils/constant').fcm;
module.exports = {
    create: async (request, cb) => {
        let upload = loadMulter(5, 'video-thumb').single('video-thumb');
        await upload(request, null, async (err) => {
            if (err)
                cb(err, {});
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.thumbnail = request.file.key;
                await Video.create(persisted, async (err, result) => {
                    cb(err, result);
                    if (result.makeAnnouncement) {
                        let title = 'Vunity Notifier';
                        let videoName = result.name;
                        let message = `${videoName.toUpperCase()}  \n ${result.description} \n CLICK TO VIEW MORE`;
                        await sendFcmMessagePromise({
                            to: announcement_topic,
                            data: {
                                title: title,
                                body: message,
                                bookId: result._id
                            },
                            notification: {
                                title: title,
                                body: message,
                                sound: 'custom_sound',
                                android_channel_id: 'fcm_default_channel'
                            }
                        });
                    }
                });
            }
        });
    },
    listAll: async (request, cb) => {
        await Video.find({})
            .populate('categoryId')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    getById: async (request, cb) => {
        let { userId, libraryId, isVideo } = request.body;
        let query = { 'userId': userId };
        if (isVideo) query.videoId = libraryId;
        else query.libraryId = libraryId;
        let isFav = false;
        if (userId)
            isFav = await Favourite.findOne(query);
        await Video
            .findById(libraryId)
            .populate('categoryId')
            .lean()
            .exec((err, result) => {
                if (result) {
                    if (isFav) result.isBookmark = true;
                    else result.isBookmark = false;
                }
                cb(err, result);
            });
    },
    updateById: async (request, cb) => {
        await Video
            .findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateThumbnail: async (request, cb) => {
        let upload = loadMulter(5, 'video-thumb').single('video-thumb');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                Video
                    .findByIdAndUpdate(request.params.id, {
                        thumbnail: request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    getRecent: async (request, cb) => {
        await Video.find({})
            .populate('categoryId')
            .sort({ createdAt: -1 })
            .limit(10)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listByCategory: async (request, cb) => {
        await Video
            .find({ 'categoryId': request.params.id })
            .populate('categoryId')
            .sort({ 'updatedAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listByGener: async (request, cb) => {
        await Video
            .find({ 'genre': request.params.genre })
            .populate('categoryId')
            .sort({ 'updatedAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    genreBasedList: async (request, cb) => {
        await Video
            .aggregate([
                {
                    '$unwind': { 'path': '$genre' }
                }, {
                    '$sort': { 'genre': 1, 'name': 1 }
                }, {
                    '$group': {
                        '_id': '$genre',
                        'items': {
                            '$push': {
                                '_id': '$_id',
                                'name': '$name',
                                'genre': '$genre',
                                'author': '$author',
                                'yearOfPublish': '$yearOfPublish',
                                'description': '$description',
                                'thumbnail': '$thumbnail',
                                'content': '$content',
                            }
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'genre': '$_id',
                        'books': { '$slice': ['$items', 10] }
                    }
                }, { '$sort': { 'updatedAt': -1 } }
            ]).exec((err, result) => {
                cb(err, result);
            });
    },
    searchFilter: async (request, cb) => {
        await Video.aggregate([{
            '$unwind': {
                'path': '$keywords'
            }
        }, {
            '$project': {
                'categoryId': '$categoryId',
                'name': {
                    '$toLower': '$name'
                },
                '_id': '$_id',
                'author': '$author',
                'keywords': {
                    '$toLower': '$keywords'
                },
                'yearOfPublish': '$yearOfPublish',
                'description': '$description',
                'thumbnail': '$thumbnail',
                'content': '$content',
                'genre': '$genre',
                'createdAt': '$createdAt',
                'updatedAt': '$updatedAt'
            }
        }, {
            '$match': {
                '$or': [
                    {
                        'name': {
                            '$regex': new RegExp(request.params.search),
                            '$options': 'i'
                        }
                    }, {
                        'keywords': {
                            '$regex': new RegExp(request.params.search),
                            '$options': 'i'
                        }
                    }
                ]
            }
        }, {
            '$group': {
                '_id': '$_id',
                'data': {
                    '$push': {
                        'id': '$_id',
                        'categoryId': '$categoryId',
                        'name': '$name',
                        'author': '$author',
                        'yearOfPublish': '$yearOfPublish',
                        'description': '$description',
                        'thumbnail': '$thumbnail',
                        'content': '$content',
                        'genre': '$genre',
                        'keywords': '$keywords',
                        'createdAt': '$createdAt',
                        'updatedAt': '$updatedAt'
                    }
                }
            }
        }, {
            '$replaceRoot': {
                'newRoot': {
                    '$mergeObjects': [
                        {
                            '$arrayElemAt': [
                                '$data', 0
                            ]
                        }, '$$ROOT'
                    ]
                }
            }
        }, {
            '$project': {
                '_id': '$id',
                'name': '$name',
                'author': '$author',
                'yearOfPublish': '$yearOfPublish',
                'description': '$description',
                'thumbnail': '$thumbnail',
                'content': '$content',
                'genre': '$genre',
                'createdAt': '$createdAt',
                'updatedAt': '$updatedAt'
            }
        }]).exec((err, result) => {
            cb(err, result);
        });
    }
};