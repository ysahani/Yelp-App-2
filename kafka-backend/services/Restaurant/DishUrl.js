const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let dishUrl = async (msg, callback) => {
    Restaurants.updateOne({ 'menu.dish_name': msg.dish_namez }, { $set: { 'menu.$.url': msg.url } }).exec((error, customer) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, customer);
      });
}

exports.dishUrl = dishUrl;