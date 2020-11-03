const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let cancelOrder = async (msg, callback) => {
    Customers.updateOne({ name: msg.name, 'orders.items': msg.items }, { $set: { 'orders.$.order_option': 'Cancel' } }).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.cancelOrder = cancelOrder;