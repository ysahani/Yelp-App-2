const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let placeOrder = async (msg, callback) => {
    const myquery = { name: msg.cName };
    const newvalues = {
      $push: {
        orders: {
          items: msg.items, r_name: msg.rName, date_time: msg.date_time, delivery_option: msg.delivery_option, real_datetime: msg.real_datetime, order_option: 'Order Recieved',
        },
      },
    };
    Customers.updateOne(myquery, newvalues, (error, restaurant) => {
      if (error) {
        return callback(error, null);
      }
      if (restaurant) {
        return callback(null, restaurant);
      }
    });
}

exports.placeOrder = placeOrder;