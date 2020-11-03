const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let makeReview = async (msg, callback) => {
  const myquery = { email: msg.customer_email };
  const newvalues = {
    $push: {
      reviews: {
        date: msg.date, rating: msg.rating, comments: msg.comment, r_name: msg.r_name,
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

exports.makeReview = makeReview;