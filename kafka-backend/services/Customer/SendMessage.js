const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let sendMessage = async (msg, callback) => {
    console.log(msg.name);
    const myquery = { name: msg.name };
    const newvalues = {
      $push: {
        messages: {
          message: msg.message, rname: msg.r_name, date_time: msg.date_time,
        },
      },
    };
    Customers.updateOne(myquery, newvalues, (error, customer) => {
        if (error) {
          return callback(error, null);
        }
        if (customer) {
          return callback(null, customer);
        }
      });
}

exports.sendMessage = sendMessage;