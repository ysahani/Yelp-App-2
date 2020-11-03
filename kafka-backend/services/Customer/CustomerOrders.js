const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let customerOrders = async (msg, callback) => {
  const data = [];
  Customers.find({ name: msg.cName }).exec((error, customer) => {
    if (error) {
        return callback(error, null);
    }
    customer.forEach((element) => {
      element.orders.forEach((order) => {
        data.push(order);
      });
    });
    return callback(null, data);
});
}

exports.customerOrders = customerOrders;