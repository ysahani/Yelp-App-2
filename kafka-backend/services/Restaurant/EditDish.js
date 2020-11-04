const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let editDish = async (msg, callback) => {
 const data = [];
  Restaurants.find({ 'menu.dish_name': msg.dish_name }).exec((error, restaurant) => {
    if (error) {
        return callback(error, null);
    }
    restaurant.forEach((element) => {
      element.menu.forEach((item) => {
        if (item.dish_name === msg.dish_name) {
          data.push(item);
        }
      });
    });
    return callback(null, data);
});
}

exports.editDish = editDish;