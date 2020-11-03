const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let showRegistered = async (msg, callback) => {
  const data = [];
  Customers.find({ email: msg.aEmail }, { events: 1 }).exec((error, customer) => {
    if (error) {
        return callback(error, null);
    }
    console.log(customer);
    customer.forEach((element) => {
      console.log(element.events);
      data.push(element.events);
    });
    return callback(null, data);
  });
}

exports.showRegistered = showRegistered;