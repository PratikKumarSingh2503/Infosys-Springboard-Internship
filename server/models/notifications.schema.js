const { Schema, model, Types } = require('mongoose');

const notificationSchema = new Schema({
    orderId: {
        type: Types.ObjectId,
        ref: 'order'
    }
}, { timestamps: true });



const Notification = model('notification', notificationSchema);

module.exports = Notification;