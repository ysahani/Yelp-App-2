const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let customerEvent = async (msg, callback) => {
  const data = [];
  const other = [];
  // const result;
  Restaurants.find({}, { events: 1 }).exec((error, customer) => {
    if (error) {
        return callback(error, null);
    }
    if (customer) {
      console.log(customer);
      customer.forEach((element) => {
        // console.log(element.events);
        data.push(element.events);
      });
    }
    // console.log(data);
    data.forEach((element) => {
      for (let i = 0; i < element.length; i++) {
        other.push(element[i]);
      }
    });

    // console.log(data);

    other.forEach((element) => {
      if (element.name === msg.asearch) {
        return callback(null, element);
      }
    });
  });
}

exports.customerEvent = customerEvent;