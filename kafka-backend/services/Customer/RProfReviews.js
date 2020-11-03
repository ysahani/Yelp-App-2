const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let rProfReviews = async (msg, callback) => {
  const data = [];
  Customers.find({}).exec((error, customer) => {
    if (error) {
        return callback(error, null);
    }
    // console.log(customer);
    customer.forEach((item) => {
      item.reviews.forEach((rev) => {
        if (rev.r_name === msg.name) {
          data.push({
            customer_name: item.name, date: rev.date, rating: rev.rating, comments: rev.comments,
          });
        }
      });
    });
    return callback(null, data);
  });
}

exports.rProfReviews = rProfReviews;