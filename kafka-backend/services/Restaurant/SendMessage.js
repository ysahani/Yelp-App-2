const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let sendMessage = async (msg, callback) => {
    console.log(msg.rname);
    const myquery = { name: msg.rname };
    const newvalues = {
      $push: {
        messages: {
          message: msg.message, cname: msg.cname, date_time: msg.date_time,
        },
      },
    };
    Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
        if (error) {
          return callback(error, null);
        }
        if (restaurant) {
          return callback(null, restaurant);
        }
      });
}

exports.sendMessage = sendMessage;