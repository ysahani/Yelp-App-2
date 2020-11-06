const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let getRecipients = async (msg, callback) => {
    const data = [];
    Restaurants.find({ name: msg.rname }).exec((error, restaurant) => {
      if (error) {
        return callback(error, null);
      }
      restaurant.forEach((element) => {
        element.messages.forEach((item) => {
          if (!data.includes(item.cname)) {
            data.push(item.cname);
          }
        });
      });
      return callback(null, data);
    });
}

exports.getRecipients = getRecipients;