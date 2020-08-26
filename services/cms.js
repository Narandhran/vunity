const { User } = require('../models/user');
const { loadFcmMessage, sendFcmMessagePromise, loadFcmTopics, sendFcmMessageCb } = require('./custom/fcm.service');
const { announcement_topic } = require('../utils/constant').fcm;
module.exports = {
    userReview: async (request, cb) => {
        let { id, status = 'Pending' } = request.body;
        let isUser = await User.findById(id);
        isUser.status = status;
        await isUser.save();
        cb(null, 'Updated Successfully');
        if (status = 'Approved') {
            try {
                await sendFcmMessagePromise(loadFcmMessage([isUser.fcmToken], 'Your account has been activated successfully, you can start using our app now. Cheers!!'));
            } catch (error) {
                console.log(error);
            }
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