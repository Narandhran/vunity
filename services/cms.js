const { User } = require('../models/user');
const { loadFcmMessage, sendFcmMessagePromise, loadFcmTopics, sendFcmMessageCb } = require('./custom/fcm.service');
const { announcement_topic } = require('../utils/constant').fcm;
const { smsGateWay } = require('../utils/constant');
const axios = require('axios').default;

module.exports = {
    userReview: async (request, cb) => {
        let { id, status = 'Pending' } = request.body;
        let isUser = await User.findById(id);
        isUser.status = status;
        await isUser.save();
        cb(null, 'Updated Successfully');
        if (status == 'Approved') {
            await sendFcmMessagePromise(await loadFcmMessage([isUser.fcmToken], 'Your account has been activated successfully, you can start using our app now. Cheers!!'));
            await axios.get(smsGateWay.uri(isUser.mobile, `Hi ${isUser.fullname}, Greetings from SWADHARMAA (V-Unity), we're letting you know that your account has been activated successfully. You can start using our app from now. Cheers, Team SWADHARMAA`));
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
    }
};