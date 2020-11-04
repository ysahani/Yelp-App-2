const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let addMenuItem = async (msg, callback) => {
    const myquery = { name: msg.rname };
    const newvalues = {
      $push: {
        menu: {
          dish_name: msg.mname, ingredients: msg.mingredients, price: msg.mprice, category: msg.mcategory, description: msg.mdescription,
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
    });
}

exports.addMenuItem = addMenuItem;