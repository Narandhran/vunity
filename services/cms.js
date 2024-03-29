const { User } = require('../models/user');
const { Logger } = require('../models/logger');
const { loadFcmMessage, sendFcmMessagePromise, loadFcmTopics, sendFcmMessageCb } = require('./custom/fcm.service');
const { announcement_topic } = require('../utils/constant').fcm;
const { smsGateWay } = require('../utils/constant');
const axios = require('axios').default;
const moment = require('moment');

module.exports = {
    userReview: async (request, cb) => {
        let { id, status = 'Pending' } = request.body;
        let isUser = await User.findById(id);
        isUser.status = status;
        await isUser.save();
        cb(null, 'Updated Successfully');
        if (status == 'Approved') {
            await sendFcmMessagePromise(await loadFcmMessage([isUser.fcmToken], 'Your account has been activated successfully, you can start using our app now. Cheers!!'));
            await axios.get(smsGateWay.uri(isUser.mobile, `Hi ${isUser.fullname}, Greetings from SWADHARMAA (V-Unity), we're letting you know that your account has been activated successfully. You can start using our app from now. Cheers, Team SWADHARMAA`,smsGateWay.template_id.greeting));
        }
    },
    userList: async (request, cb) => {
        await User
            .find({ 'status': { '$in': ['Pending', 'Approved'] } }, '_id fname lname dp email gender mobile')
            .sort({ status: 1 })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    announcement: async (request, cb) => {
        let { title, message } = request.body;
        cb(null, 'Success');
        await sendFcmMessagePromise(await loadFcmTopics(announcement_topic, title, message, message));
    },
    activeUserReport: async (request, cb) => {
        let getQuery = (sDate, tDate) => {
            return [
                {
                    '$project': {
                        'date': {
                            '$dateToString': {
                                'date': '$createdAt',
                                // 'timezone': 'Asia/Kolkata',
                                'format': '%d-%m-%Y'
                            }
                        },
                        'url': 1,
                        'host': 1,
                        'user': 1,
                        'createdAt': 1,
                        'method': 1,
                        'ip': 1,
                        'deviceId': 1
                    }
                }, {
                    '$match': {
                        'url': '/library/homepage',
                        'createdAt': {
                            '$gt': sDate,
                            '$lt': tDate
                        }
                    }
                }, {
                    '$group': {
                        '_id': {
                            'user': '$user',
                            'date': '$date'
                        },
                        'count': {
                            '$sum': 1
                        }
                    }
                }, {
                    '$group': {
                        '_id': '$_id.date',
                        'activeUsers': {
                            '$sum': 1
                        }
                    }
                }, {
                    '$project': {
                        '_id': 0,
                        'date': '$_id',
                        'activeUsers': 1
                    }
                }, {
                    '$sort': {
                        'date': 1
                    }
                }
            ];
        };
        Promise.all([
            (await User.find()).length,
            Logger.aggregate(getQuery(new Date(moment().format('YYYY-MM-DD')), new Date(moment().add(1, 'days').format('YYYY-MM-DD')))),
            Logger.aggregate(getQuery(new Date(moment().subtract(7, 'days').format('YYYY-MM-DD')), new Date(moment().format('YYYY-MM-DD'))))
        ]).then(result => {
            let [totalUser, live, report] = [...result];
            cb(null, { totalUser, activeUser: live[0].activeUsers, report });
        }).catch(err => { cb(err, {}); });

    }
};