const { User } = require('../models/user');
const { loadFcmMessage, sendFcmMessagePromise } = require('./custom/fcm.service');

module.exports = {
    userReview: async (request, cb) => {
        let { id, status = 'Pending' } = request.body;
        let isUser = await User.findById(id);
        if (status = 'Approved')
            await sendFcmMessagePromise(loadFcmMessage(isUser.fcmToken, 'Your account has been activated successfully, you can start using our app now. Cheers!!'));
        await User.
            findByIdAndUpdate(id, { 'status': status })
            .exec((err, result) => {
                cb(err, result);
            });
    },
    userList: async(request,cb)=>{
        await User
        .find({'status': { '$in': ['Pending', 'Approved'] }}, '_id fname lname dp email gender mobile')
        .sort({status: 1})
        .exec((err, result) => {
            cb(err, result);
        });
    }
};