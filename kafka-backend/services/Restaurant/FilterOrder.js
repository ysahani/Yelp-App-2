const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let filterOrder = async (msg, callback) => {
    const data = [];
    if (msg.filter === 'Delivered Orders') {
      Customers.find({}).exec((error, customer) => {
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        customer.forEach((element) => {
          element.orders.forEach((order) => {
            if (order.r_name === msg.rName && order.order_option === 'Delivered') {
              data.push(order);
            }
          });
        });
        return callback(null, data);
      });
    } else if (msg.filter === 'New Orders') {
      Customers.find({}).exec((error, customer) => {
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        customer.forEach((element) => {
          element.orders.forEach((order) => {
            if (order.r_name === msg.rName && order.order_option === 'Order Recieved') {
              data.push(order);
            }
          });
        });
        return callback(null, data);
      });
    } else if (msg.filter === 'Cancelled Orders') {
      Customers.find({}).exec((error, customer) => {
        if (error) {
          console.log(error);
          return callback(error, null);
        }
        customer.forEach((element) => {
          element.orders.forEach((order) => {
            if (order.r_name === msg.rName && order.order_option === 'Cancel') {
              data.push(order);
            }
          });
        });
        return callback(null, data);
      });
    } else if (msg.filter === 'All Orders') {
      Customers.find({}).exec((error, customer) => {
        if (error) {
          console.log(error);
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
}

exports.filterOrder = filterOrder;