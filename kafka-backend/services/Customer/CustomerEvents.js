const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let customerEvents = async (msg, callback) => {
  const data = [];
  Restaurants.find({}, { events: 1 }).exec((error, customer) => {
    if (error) {
        console.log(error);
        return callback(error, null);
    }
    if (customer) {
      // console.log(customer);
      customer.forEach((element) => {
        // console.log(element.events);
        data.push(element.events);
      });
    }
    return callback(null, data);
  });
}

exports.customerEvents = customerEvents;