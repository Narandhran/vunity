const { Library } = require('../models/library');
const { Favourite } = require('../models/favourite');
const { loadMulter } = require('../services/custom/multers3.service');

module.exports = {
    create: async (request, cb) => {
        let upload = loadMulter(20, 'book').any();
        await upload(request, null, async (err) => {
            if (err)
                cb(err, {});
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.thumbnail = request.files[0].key;
                persisted.content = request.files[1].key;
                await Library.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    listAll: async (request, cb) => {
        await Library.find({})
            .populate('categoryId')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    getById: async (request, cb) => {
        let { userId, libraryId } = request.body;
        let isFav = false;
        if (userId)
            isFav = await Favourite.findOne({ 'userId': userId, 'libraryId': libraryId });
        await Library
            .findById(libraryId)
            .populate('categoryId')
            .lean()
            .exec((err, result) => {
                if (isFav) result.isBookmark = true;
                else result.isBookmark = false;
                console.log(JSON.stringify(result));
                cb(err, result);
            });
    },
    updateById: async (request, cb) => {
        await Library
            .findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateThumbnail: async (request, cb) => {
        let upload = loadMulter(5, 'book').single('pdf-thumb');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                Library
                    .findByIdAndUpdate(request.params.id, {
                        thumbnail: request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    updateBook: async (request, cb) => {
        let upload = loadMulter(5, 'book').single('content');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                Library
                    .findByIdAndUpdate(request.params.id, {
                        content: request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    getRecent: async (request, cb) => {
        await Library.find({})
            .populate('categoryId')
            .sort({ createdAt: -1 })
            .limit(10)
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listByCategory: async (request, cb) => {
        await Library
            .find({ 'categoryId': request.params.id })
            .populate('categoryId')
            .sort({ 'updatedAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    listByGener: async (request, cb) => {
        await Library
            .find({ 'genre': request.params.genre })
            .populate('categoryId')
            .sort({ 'updatedAt': -1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    genreBasedList: async (request, cb) => {
        await Library
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
                }
            ]).exec((err, result) => {
                cb(err, result);
            });
    },
    searchFilter: async (request, cb) => {
        await Library.aggregate([{
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