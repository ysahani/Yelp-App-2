const { MarketplaceEntitlementService } = require('aws-sdk');
const express = require('express');
const kafka = require('../kafka/client');

const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../Utils/config');
// const Customers = require('../Models/CustomerModel');
// const Restaurants = require('../Models/RestaurantModel');
const { auth, checkAuth } = require('../Utils/passport');

auth();

// // Route to handle Post Request Call
// router.post('/updateprofile', (req, res) => {
//   const myquery = { email: req.body.emailid };
//   const newvalues = {
//     $set: {
//       name: req.body.rname, location: req.body.loc, description: req.body.desc, timings: req.body.time,
//     },
//   };
//   Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log('Error in update profile');
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Restaurant profile updated!');
//       res.status(200).end('Success!');
//     }
//   });
// });

router.post('/updateprofile', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'updateProfile';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Restaurant profile updated!');
      res.status(200).end('Succesful');
    }
  });
});

// router.post('/addevent', (req, res) => {
//   const myquery = { name: req.body.name };
//   const newvalues = {
//     $push: {
//       events: {
//         name: req.body.ename, description: req.body.desc, time: req.body.atime, date: req.body.adate, location: req.body.loc, hashtags: req.body.htag,
//       },
//     },
//   };
//   Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Added event!');
//       res.status(200).end('Success!');
//     }
//     // res.status(200).end('Success!');
//   });
// });

router.post('/addevent', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'addEvent';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Added event!');
      res.status(200).end('Succesful');
    }
  });
});

// router.post('/restaurantevents', (req, res) => {
//   const data = [];
//   Restaurants.find({}).exec((error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       restaurant.forEach((element) => {
//         data.push(element.events);
//       });

//       data.forEach((element) => console.log(element));
//       res.send(data);
//     }
//   });
// });

router.post('/restaurantevents', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'restaurantEvents';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/registeredlist', (req, res) => {
//   const data = [];
//   Customers.find({}).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//     }
//     customer.forEach((element) => {
//       element.events.forEach((item) => {
//         if (req.body.eName === item.event_name) {
//           data.push(element.name);
//         }
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/registeredlist', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'registeredList';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/viewcustomer', (req, res) => {
//   Customers.find({ name: req.body.cname }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//     }
//     res.send(customer);
//     console.log(customer);
//   });
// });

router.post('/viewcustomer', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'viewCustomer';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/addmenuitem', (req, res) => {
//   const myquery = { name: req.body.rname };
//   const newvalues = {
//     $push: {
//       menu: {
//         dish_name: req.body.mname, ingredients: req.body.mingredients, price: req.body.mprice, category: req.body.mcategory, description: req.body.mdescription,
//       },
//     },
//   };
//   Restaurants.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Added menu item!');
//       res.status(200).end('Success!');
//     }
//   });
// });

router.post('/addmenuitem', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'addMenuItem';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Added menu item!');
      res.status(200).end('Success!');
    }
  });
});

// router.post('/menu', checkAuth, (req, res) => {
//   const data = [];
//   Restaurants.find({ name: req.body.rname }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//     }
//     console.log(customer);
//     customer.forEach((item) => {
//       item.menu.forEach((thing) => {
//         data.push(thing);
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/menu', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'menu';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log('ERROR in menu');
      res.status(202).end('Error occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/restaurantorders', (req, res) => {
//   const data = [];
//   Customers.find({}).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     customer.forEach((element) => {
//       element.orders.forEach((order) => {
//         if (order.r_name === req.body.rName) {
//           data.push(order);
//         }
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/restaurantorders', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'restaurantOrders';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log('ERROR in menu');
      res.status(202).end('Error occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/updateorder', (req, res) => {
//   Customers.updateOne({ 'orders.items': req.body.items }, { $set: { 'orders.$.order_option': req.body.order_option } }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     console.log(customer);
//     res.status(200).end('Succesful update in order!');
//   });
// });

router.post('/updateorder', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'updateOrder';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      res.status(200).end('Succesful update in order!');
    }
  });
});

// router.post('/filterorder', (req, res) => {
//   const data = [];
//   if (req.body.filter === 'Delivered Orders') {
//     Customers.find({}).exec((error, customer) => {
//       if (error) {
//         console.log(error);
//         res.status(202).end('Error Occured');
//       }
//       customer.forEach((element) => {
//         element.orders.forEach((order) => {
//           if (order.r_name === req.body.rName && order.order_option === 'Delivered') {
//             data.push(order);
//           }
//         });
//       });
//       res.send(data);
//     });
//   } else if (req.body.filter === 'New Orders') {
//     Customers.find({}).exec((error, customer) => {
//       if (error) {
//         console.log(error);
//         res.status(202).end('Error Occured');
//       }
//       customer.forEach((element) => {
//         element.orders.forEach((order) => {
//           if (order.r_name === req.body.rName && order.order_option === 'Order Recieved') {
//             data.push(order);
//           }
//         });
//       });
//       res.send(data);
//     });
//   } else if (req.body.filter === 'Cancelled Orders') {
//     Customers.find({}).exec((error, customer) => {
//       if (error) {
//         console.log(error);
//         res.status(202).end('Error Occured');
//       }
//       customer.forEach((element) => {
//         element.orders.forEach((order) => {
//           if (order.r_name === req.body.rName && order.order_option === 'Cancel') {
//             data.push(order);
//           }
//         });
//       });
//       res.send(data);
//     });
//   } else if (req.body.filter === 'All Orders') {
//     Customers.find({}).exec((error, customer) => {
//       if (error) {
//         console.log(error);
//         res.status(202).end('Error Occured');
//       }
//       customer.forEach((element) => {
//         element.orders.forEach((order) => {
//           if (order.r_name === req.body.rName) {
//             data.push(order);
//           }
//         });
//       });
//       res.send(data);
//     });
//   }
// });

router.post('/filterorder', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'filterOrder';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/editdish', (req, res) => {
//   const data = [];
//   Restaurants.find({ 'menu.dish_name': req.body.dish_name }).exec((error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     restaurant.forEach((element) => {
//       element.menu.forEach((item) => {
//         if (item.dish_name === req.body.dish_name) {
//           data.push(item);
//         }
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/editdish', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'editDish';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/updatedish', (req, res) => {
//   Restaurants.updateOne({ 'menu.dish_name': req.body.dname }, {
//     $set: {
//       'menu.$.dish_name': req.body.dname, 'menu.$.ingredients': req.body.ing, 'menu.$.price': req.body.prce, 'menu.$.category': req.body.cat, 'menu.$.description': req.body.desc,
//     },
//   }).exec((error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     console.log('Dish updated!');
//     res.status(200).end('Succesful update in order!');
//   });
// });

router.post('/updatedish', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'updateDish';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      res.status(200).end('Succesful update in order!');
    }
  });
});

// router.post('/reviews', (req, res) => {
//   const data = [];
//   Customers.find({}).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     customer.forEach((element) => {
//       element.reviews.forEach((item) => {
//         if (item.r_name === req.body.r_name) {
//           data.push(item);
//         }
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/reviews', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'reviews';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      res.send(results);
    }
  });
});

router.post('/sendmessage', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'sendMessage';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      console.log(results);
      res.status(200).end('Succesful message sent!');
    }
  });
});

router.post('/getrecipients', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'getRecipients';
  kafka.make_request('restaurant', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error occured');
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

module.exports = router;
