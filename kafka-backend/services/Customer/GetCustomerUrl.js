const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let getCustomerUrl = async (msg, callback) => {
    Customers.find({ email: msg.email }).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.getCustomerUrl = getCustomerUrl;