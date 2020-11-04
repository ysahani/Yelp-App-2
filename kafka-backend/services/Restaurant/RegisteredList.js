const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let registeredList = async (msg, callback) => {
    const data = [];
    Customers.find({}).exec((error, customer) => {
      if (error) {
        return callback(error, null);
      }
      customer.forEach((element) => {
        element.events.forEach((item) => {
          if (msg.eName === item.event_name) {
            data.push(element.name);
          }
        });
      });
      return callback(null, data);
    });
}

exports.registeredList = registeredList;