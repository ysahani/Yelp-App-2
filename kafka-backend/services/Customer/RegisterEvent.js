const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let registerEvent = async (msg, callback) => {
    const myquery = { email: msg.aEmail };
    const newvalues = {
      $push: {
        events: {
          event_name: msg.eName,
        },
      },
    };
    Customers.updateOne(myquery, newvalues, (error, restaurant) => {
      if (error) {
        return callback(error, null);
      }
      if (restaurant) {
        return callback(null, restaurant);
      }
    });
}

exports.registerEvent = registerEvent;