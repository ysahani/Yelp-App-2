const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let menu = async (msg, callback) => {
  const data = [];
  Restaurants.find({ name: msg.rname }).exec((error, customer) => {
    if (error) {
        return callback(error, null);
    }
    console.log(customer);
    customer.forEach((item) => {
      item.menu.forEach((thing) => {
        data.push(thing);
      });
    });
    return callback(null, data);
  });
}

exports.menu = menu;