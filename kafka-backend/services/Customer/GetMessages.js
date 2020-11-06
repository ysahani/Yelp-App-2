const Restaurants = require('../../Models/RestaurantModel');
const Customers = require('../../Models/CustomerModel');

let getMessages = async (msg, callback) => {
    console.log(msg);
    let data = [];
    Restaurants.find({}).exec((error, restaurant) => {
        if (error) {
            return callback(error, null);
        }
        if (restaurant) {
            restaurant.forEach((element) => {
                element.messages.forEach((ting) => {
                    if (ting.cname === msg.name && element.name === msg.rname) {
                        // console.log(ting);
                        data.push(ting);
                    }
                });
            });
          }
          Customers.find({}).exec((error, customer) => {
            if (error) {
                console.log('error');
                return callback(error, null);
            }
            if (customer) {
                customer.forEach((element) => {
                    element.messages.forEach((ting) => {
                        if (ting.rname === msg.rname && element.name === msg.name) {
                            // console.log(ting);
                            data.push(ting);
                        }
                    });
                });
                const dat = data.sort((a, b) => new Date(a.date_time) - new Date(b.date_time));
                // console.log(dat);
                return callback(null, dat);
              }
        // const dat = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        // console.log(dat);
        // return callback(null, dat);
        });
    });

    // Customers.find({}).exec((error, customer) => {
    //     if (error) {
    //         return callback(error, null);
    //     }
    //     if (customer) {
    //         customer.forEach((element) => {
    //             element.messages.forEach((ting) => {
    //                 if (ting.rname === msg.rname) {
    //                     // console.log(ting);
    //                     data.push(ting);
    //                 }
    //             });
    //         });
    //       }
    // data.sort((a, b) => new Date(a.date) - new Date(b.date));
    // console.log(data);
    // return callback(null, data);
    // });
}

exports.getMessages = getMessages;