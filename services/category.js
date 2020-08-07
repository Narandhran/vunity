const { Category } = require('../models/category');
const { loadMulter } = require('./custom/multers3.service');
const { upload } = require('./custom/multers3.service');
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
            .exec((err, result) => {
                cb(err, result);
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