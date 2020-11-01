const { Category } = require('../models/category');
const { loadMulter } = require('./custom/multers3.service');
const { Video } = require('../models/video');
const { Library } = require('../models/library');
const { upload } = require('./custom/multers3.service');
const { User } = require('../models/user');
module.exports = {
    create: async (request, cb) => {
        let upload = loadMulter(5, 'category-thumb').single('category');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.thumbnail = request.file.key;
                Category.create(persisted, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    list: async (request, cb) => {
        await Category.find({})
            .exec(async (err, result) => {
                let persisted = [];
                if (request.params.id == 'library') {
                    for (const iterator of result) {
                        if ((await Library.find({ 'categoryId': iterator._id })).length > 0) {
                            persisted.push(iterator);
                        }
                    }
                } else if (request.params.id == 'video') {
                    for (const iterator of result) {
                        if ((await Video.find({ 'categoryId': iterator._id })).length > 0) {
                            persisted.push(iterator);
                        }
                    }
                } else {
                    persisted = result;
                }
                cb(err, persisted);
            });
    },
    updateById: async (request, cb) => {
        await Category
            .findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateThumbnail: async (request, cb) => {
        let upload = loadMulter(5, 'category-thumb').single('category');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                Category
                    .findByIdAndUpdate(request.params.id, {
                        thumbnail: request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    }
};