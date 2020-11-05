const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let getRecipients = async (msg, callback) => {
    const data = [];
    Restaurants.find({ name: msg.name }).exec((error, restaurant) => {
      if (error) {
        return callback(error, null);
      }
      restaurant.forEach((element) => {
        element.messages.forEach((item) => {
          data.push(item.cname);
        });
      });
      return callback(null, data);
    });
}

exports.getRecipients = getRecipients;