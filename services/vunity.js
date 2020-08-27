const { Vunity } = require('../models/vunity');
const { loadMulter } = require('../services/custom/multers3.service');
const { request } = require('express');
const { User } = require('../models/user');

module.exports = {
    create: async (request, cb) => {
        let persisted = request.body;
        persisted.user_id = request.verifiedToken._id;
        await Vunity.create(persisted, (err, result) => {
            cb(err, result);
        });
    },
    update: async (request, cb) => {
        await Vunity
            .findByIdAndUpdate(request.params.id, request.body, { new: true })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    findByUserId: async (request, cb) => {
        await Vunity
            .findOne({ user_id: request.params.id })
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    list: async (request, cb) => {
        let blockedUser = await User.find({ status: { '$in': ['Blocked', 'Pending'] } }, '_id').lean();
        blockedUser.push({ _id: request.verifiedToken._id });
        let filterList = blockedUser.map(val => val._id);
        await Vunity
            .find({ 'user_id': { '$nin': filterList } })
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    updatePhoto: async (request, cb) => {
        let upload = await loadMulter(5, 'dp').single('dp');
        await upload(request, null, async (err) => {
            if (err)
                cb(err);
            else {
                await Vunity
                    .findOneAndUpdate({ 'user_id': request.verifiedToken._id }, {
                        'photo': request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, request.file.key);
                    });
            }
        });
    },
    customFilter: async (request, cb) => {
        let blockedUser = await User.find({ status: { '$in': ['Blocked', 'Pending'] } }, '_id').lean();
        blockedUser.push({ _id: request.verifiedToken._id });
        let filterList = blockedUser.map(val => val._id);
        let filterQuery = { 'user_id': { '$nin': filterList } };
        let { vedham = null, samprdhayam = null, shakha = [], vedha_adhyayanam = [], shadanga_adhyayanam = null,
            shastra_adhyayanam = [], prayogam = [], marital_status = null, mother_tongue = null, city = null } = request.body;
        if (vedham) filterQuery.vedham = vedham;
        if (samprdhayam) filterQuery.samprdhayam = samprdhayam;
        if (shakha.length > 0) filterQuery.shakha = { '$all': shakha };
        if (vedha_adhyayanam.length > 0) filterQuery.vedha_adhyayanam = { '$all': vedha_adhyayanam };
        if (shadanga_adhyayanam) filterQuery.shadanga_adhyayanam = shadanga_adhyayanam;
        if (shastra_adhyayanam.length > 0) filterQuery.shastra_adhyayanam = { '$all': shastra_adhyayanam };
        if (prayogam.length > 0) filterQuery.prayogam = { '$all': prayogam };
        if (marital_status) filterQuery.marital_status = marital_status;
        if (mother_tongue) filterQuery.mother_tongue = mother_tongue;
        if (city) filterQuery.city = city;
        // console.log('Filter: ' + JSON.stringify(filterQuery));
        await Vunity
            .find(filterQuery)
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    customSearch: async (request, cb) => {
        let blockedUser = await User.find({ status: { '$in': ['Blocked', 'Pending'] } }, '_id').lean();
        blockedUser.push({ _id: request.verifiedToken._id });
        let filterList = blockedUser.map(val => val._id);
        await Vunity
            .find({
                'user_id': { '$nin': filterList },
                '$or': [
                    {
                        'name': {
                            '$regex': new RegExp(request.params.search),
                            '$options': 'i'
                        }
                    }, {
                        'mobile': {
                            '$regex': new RegExp(request.params.search),
                            '$options': 'i'
                        }
                    }
                ]
            })
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    mobileVisibilityUpdate: async (request, cb) => {
        await Vunity
            .findByIdAndUpdate(request.params.id, request.body)
            .exec((err, result) => {
                cb(err, result);
            });
    }
};