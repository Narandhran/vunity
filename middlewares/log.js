const { Logger } = require('../models/logger');
module.exports = {
    logger: async (req, res, next) => {
        await Logger.create({
            ip: req.ip,
            method: req.method,
            url: req.originalUrl,
            host: req.hostname,
            user: req.verifiedToken ? req.verifiedToken._id : null,
            deviceId: req.verifiedToken ? req.verifiedToken.deviceId : null
        }, (err, result) => {
            if (err)
                console.log('logger error');
        });
        next();
    }
};