const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let viewCustomer = async (msg, callback) => {
    Customers.find({ name: msg.cname }).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.viewCustomer = viewCustomer;