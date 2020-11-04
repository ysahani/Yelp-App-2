const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let updateDish = async (msg, callback) => {
    Restaurants.updateOne({ 'menu.dish_name': msg.dname }, {
        $set: {
          'menu.$.dish_name': msg.dname, 'menu.$.ingredients': msg.ing, 'menu.$.price': msg.prce, 'menu.$.category': msg.cat, 'menu.$.description': msg.desc,
        },
      }).exec((error, restaurant) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, restaurant);
      });
}

exports.updateDish = updateDish;