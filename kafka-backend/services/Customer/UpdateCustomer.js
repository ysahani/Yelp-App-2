const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let updateCustomer = async (msg, callback) => {
    const myquery = { email: msg.email };
    const newvalues = {
      $set: {
        yelpingSince: msg.yelpSince, thingsILove: msg.love, findMeIn: msg.findIn, blogsite: msg.weblog, dob: msg.dob, city: msg.acity, state: msg.astate, country: msg.acountry, nickname: msg.nname, phone: msg.aPhone, email: msg.email, name: msg.fullname,
      },
    };
    Customers.updateOne(myquery, newvalues, (error, restaurant) => {
      if (error) {
        console.log(error);
        return callback(error, null);
      }
      if (restaurant) {
        return callback(null, restaurant);
      }
    });
}

exports.updateCustomer = updateCustomer;