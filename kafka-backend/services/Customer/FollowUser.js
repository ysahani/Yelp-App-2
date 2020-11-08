const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let followUser = async (msg, callback) => {
    console.log(msg);
    const myquery = { name: msg.name };
    const newvalues = {
      $push: {
        following: {
          cname: msg.cname,
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

exports.followUser = followUser;