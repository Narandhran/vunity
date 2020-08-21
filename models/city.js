const { model, Schema } = require('mongoose');

var citySchema = new Schema({
    city: {
        type: String
    },
    pincode:{
        type: String
    }
}, { timestamps: false });

var City = model('city', citySchema);
module.exports = { City };