const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let addEvent = async (msg, callback) => {
    const myquery = { name: msg.name };
    const newvalues = {
      $push: {
        events: {
          name: msg.ename, description: msg.desc, time: msg.atime, date: msg.adate, location: msg.loc, hashtags: msg.htag,
        },
      },
    };
    Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
      if (error) {
        return callback(error, null);
      }
      if (restaurant) {
        return callback(null, restaurant);
      }
      // res.status(200).end('Success!');
    });
}

exports.addEvent = addEvent;