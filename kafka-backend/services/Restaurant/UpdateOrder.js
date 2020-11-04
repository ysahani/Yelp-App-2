const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let updateOrder = async (msg, callback) => {
    Customers.updateOne({ 'orders.items': msg.items }, { $set: { 'orders.$.order_option': msg.order_option } }).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.updateOrder = updateOrder;