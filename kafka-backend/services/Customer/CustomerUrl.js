const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let customerUrl = async (msg, callback) => {
    Customers.updateOne({ email: msg.anEmail }, { $set: { url: msg.url } }).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.customerUrl = customerUrl;