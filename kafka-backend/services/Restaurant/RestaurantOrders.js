const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let restaurantOrders = async (msg, callback) => {
    const data = [];
    Customers.find({}).exec((error, customer) => {
      if (error) {
        return callback(error, null);
      }
      customer.forEach((element) => {
        element.orders.forEach((order) => {
          if (order.r_name === msg.rName) {
            data.push(order);
          }
        });
      });
      return callback(null, data);
    });
}

exports.restaurantOrders = restaurantOrders;