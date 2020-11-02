const Restaurants = require('../Models/RestaurantModel');
const Customers = require('../Models/CustomerModel');

let handle_request = async (msg, callback) => {
  const myobj = {
    name: msg.rname, email: msg.user, password: msg.pass, location: msg.loc, timings: '', description: '',
  };
  const anobj = {
    name: msg.cname, email: msg.user, password: msg.pass, yelpingSince: '', thingsILove: '', findMeIn: '', blogsite: '', dob: '', city: '', state: '', country: '', nickname: '', phone: '', url: '',
  };
  if (msg.pers === 'restaurant') {
    Restaurants.create(myobj, (err, restaurant) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, restaurant);
      }
    });
  } else if (msg.pers === 'customer') {
    Customers.create(anobj, (err, customer) => {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, customer);
      }
    });
  }
}

exports.handle_request = handle_request;