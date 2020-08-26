const { fcm } = require('../../utils/constant');
var FCM = require('fcm-push');

var serverKey = fcm.SERVER_KEY;
var FCM = new FCM(serverKey);
module.exports = {
    loadFcmMessage: async (target, title, body, data) => {
        return {
            registration_ids: target,
            // collapse_key: 'your_collapse_key',
            data: {
                object: data
            },
            notification: {
                title: title,
                body: body,
                sound: 'default'
            }
        };
    },

    loadFcmTopics: async (target, title, body, rrData) => {
        return {
            to: target,
            // collapse_key: 'your_collapse_key',
            data: {
                rr_data: rrData
            },
            notification: {
                title: title,
                body: body,
                sound: 'default'
            }
        };
    },

    sendFcmMessagePromise: async (message) => {
        return await FCM.send(message);
    },

    sendFcmMessageCb: async (message, cb) => {
        await FCM.send(message, function (err, result) {
            cb(err, result);
        });
    }
};
