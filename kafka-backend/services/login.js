const Restaurants = require('../Models/RestaurantModel');
const Customers = require('../Models/CustomerModel');

let handle_request = async (msg, callback) => {
    Restaurants.findOne({ email: msg.user, password: msg.pass }, (error, user) => {
        if (error) {
          console.log(error);
        }
        if (user) {
            user.persona = 'restaurant';
            return callback(null, user);
        } else {
          console.log('not user!');
        }
      });
      Customers.findOne({ email: msg.user, password: msg.pass }, (error, user) => {
        if (error) {
            return callback(error, null);
        }
        if (user) {
            user.persona = 'customer';
            return callback(null, user);
        } else {
            return callback(error, null);
        }
      });
}

exports.handle_request = handle_request;