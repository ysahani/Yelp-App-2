const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let customerPage = async (msg, callback) => {
  const data = [];
  Restaurants.find({}).exec((error, restaurant) => {
    if (error) {
      return callback(error, null);
    }
    restaurant.forEach((rest) => {
      if (rest.name === msg.val || rest.location === msg.val) {
        data.push(rest.name);
      }
    });
    restaurant.forEach((thing) => {
      thing.menu.forEach((item) => {
        if (item.dish_name === msg.val) {
          data.push(thing.name);
        }
      });
    });
    return callback(null, data);
  });
}

exports.customerPage = customerPage;