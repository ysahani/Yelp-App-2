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
            let obj = {};
            obj.items = order.items;
            obj.r_name = order.r_name;
            obj.date_time = order.date_time;
            obj.delivery_option = order.delivery_option;
            obj.real_datetime = order.real_datetime;
            obj.order_option = order.order_option;
            obj.cName = element.name;
            console.log(obj);
            data.push(obj);
          }
        });
      });
      console.log(data);
      return callback(null, data);
    });
}

exports.restaurantOrders = restaurantOrders;