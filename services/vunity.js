const { Vunity } = require('../models/vunity');
const { loadMulter } = require('../services/custom/multers3.service');
const { request } = require('express');

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
    },
    updatePhoto: async (request, cb) => {
        let upload = await loadMulter(5, 'dp').single('dp');
        await upload(request, null, async (err) => {
            if (err)
                cb(err);
            else {
                await Vunity
                    .findByIdAndUpdate(request.verifiedToken._id, {
                        photo: request.file.key
                    }, { new: true })
                    .exec((err, result) => {
                        cb(err, result);
                    });
            }
        });
    },
    customFilter: async (request, cb) => {
        let filterQuery = {};
        let { vedham = null, samprdhayam = null, shakha = [], vedha_adhyayanam = [], shadanga_adhyayanam = null,
            shastra_adhyayanam = [], prayogam = [], marital_status = null, mother_tongue = [] } = request.body;
        if (vedham) filterQuery.vedham = vedham;
        if (samprdhayam) filterQuery.samprdhayam = samprdhayam;
        if (shakha.length > 0) filterQuery.shakha = { '$in': shakha };
        if (vedha_adhyayanam.length > 0) filterQuery.vedha_adhyayanam = { '$in': vedha_adhyayanam };
        if (shadanga_adhyayanam != null) filterQuery.shadanga_adhyayanam = shadanga_adhyayanam;
        if (shastra_adhyayanam.length > 0) filterQuery.shastra_adhyayanam = { '$in': shastra_adhyayanam };
        if (prayogam.length > 0) filterQuery.prayogam = { '$in': prayogam };
        if (marital_status) filterQuery.marital_status = marital_status;
        if (mother_tongue.length > 0) filterQuery.mother_tongue = { '$in': mother_tongue };
        // console.log('Filter: ' + JSON.stringify(filterQuery));
        await Vunity
            .find(filterQuery)
            .populate('user_id')
            .exec((err, result) => {
                cb(err, result);
            });
    },
    customSearch: async (request, cb) => {
        await Vunity
            .find({
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
    }
};