const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let reviews = async (msg, callback) => {
    const data = [];
    Customers.find({}).exec((error, customer) => {
      if (error) {
        return callback(error, null);
      }
      customer.forEach((element) => {
        element.reviews.forEach((item) => {
          if (item.r_name === msg.r_name) {
            data.push(item);
          }
        });
      });
      return callback(null, data);
    });
}

exports.reviews = reviews;