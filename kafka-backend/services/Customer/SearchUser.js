const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let searchUser = async (msg, callback) => {
    Customers.findOne({ name: msg.val}).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.searchUser = searchUser;