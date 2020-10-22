const { Banner } = require('../models/banner');
const { loadMulter } = require('./custom/multers3.service');
const { upload } = require('./custom/multers3.service');
module.exports = {
    create: async (request, cb) => {
        let upload = loadMulter(5, 'banner').single('banner');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                Banner.create({ 'banner': request.file.key }, (err, result) => {
                    cb(err, result);
                });
            }
        });
    },
    list: async (request, cb) => {
        await Banner.find({})
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updateBanner: async (request, cb) => {
        let upload = loadMulter(5, 'banner').single('banner');
        await upload(request, null, (err) => {
            if (err)
                cb(err, {});
            else {
                let persisted = JSON.parse(request.body.textField);
                persisted.banner = request.file.key;
                Banner
                    .findByIdAndUpdate(request.params.id, persisted, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    }
};