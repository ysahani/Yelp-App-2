const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let updateProfile = async (msg, callback) => {
  const myquery = { email: msg.emailid };
  const newvalues = {
    $set: {
      name: msg.rname, location: msg.loc, description: msg.desc, timings: msg.time,
    },
  };
  Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
    if (error) {
        return callback(error, null);
    }
    if (restaurant) {
        return callback(null, restaurant);
    }
  });
}

exports.updateProfile = updateProfile;