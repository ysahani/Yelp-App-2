const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let restaurantEvents = async (msg, callback) => {
  const data = [];
  Restaurants.find({}).exec((error, restaurant) => {
    if (error) {
        return callback(error, null);
    }
    if (restaurant) {
      restaurant.forEach((element) => {
        data.push(element.events);
      });

      data.forEach((element) => console.log(element));
      return callback(null, data);
    }
  });
}

exports.restaurantEvents = restaurantEvents;