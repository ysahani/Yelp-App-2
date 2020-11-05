const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let getRecipients = async (msg, callback) => {
    const data = [];
    Restaurants.find({}).exec((error, restaurant) => {
      if (error) {
        return callback(error, null);
      }
      restaurant.forEach((element) => {
        element.messages.forEach((item) => {
          if (item.cname === msg.name && !data.includes(item.cname)) {
              data.push(element.name);
          }
        });
      });
      return callback(null, data);
    });
}

exports.getRecipients = getRecipients;