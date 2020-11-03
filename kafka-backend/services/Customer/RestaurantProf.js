const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let restaurantProf = async (msg, callback) => {
    Restaurants.find({ name: msg.name }).exec((error, restaurant) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, restaurant);
      });
}

exports.restaurantProf = restaurantProf;