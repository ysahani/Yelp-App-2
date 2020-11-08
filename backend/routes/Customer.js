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
// router.post('/updatecustomer', (req, res) => {
//   const myquery = { email: req.body.email };
//   const newvalues = {
//     $set: {
//       yelpingSince: req.body.yelpSince, thingsILove: req.body.love, findMeIn: req.body.findIn, blogsite: req.body.weblog, dob: req.body.dob, city: req.body.acity, state: req.body.astate, country: req.body.acountry, nickname: req.body.nname, phone: req.body.aPhone, email: req.body.email, name: req.body.fullname,
//     },
//   };
//   Customers.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log('Error in update customer');
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Customer profile updated!');
//       res.status(200).end('Success!');
//     }
//   });
// });

router.post('/updatecustomer', (req, res) => {
  const msg = req.body;
  msg.route = 'updateCustomer';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log('ERROR in update customer');
      res.status(202).end('Error occured');
    } else {
      console.log('Customer profile updated!');
      res.status(200).end('Success!');
    }
  });
});

// router.post('/customerevents', (req, res) => {
//   const data = [];
//   Restaurants.find({}, { events: 1 }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (customer) {
//       // console.log(customer);
//       customer.forEach((element) => {
//         // console.log(element.events);
//         data.push(element.events);
//       });
//     }
//     res.send(data);
//   });
// });

router.post('/customerevents', (req, res) => {
  const msg = req.body;
  msg.route = 'customerEvents';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/customerevent', (req, res) => {
//   const data = [];
//   const other = [];
//   // const result;
//   Restaurants.find({}, { events: 1 }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (customer) {
//       console.log(customer);
//       customer.forEach((element) => {
//         // console.log(element.events);
//         data.push(element.events);
//       });
//     }
//     // console.log(data);
//     data.forEach((element) => {
//       for (let i = 0; i < element.length; i++) {
//         other.push(element[i]);
//       }
//     });

//     // console.log(data);

//     other.forEach((element) => {
//       if (element.name === req.body.asearch) {
//         console.log(element);
//         res.send(element);
//       }
//     });
//   });
// });

router.post('/customerevent', (req, res) => {
  const msg = req.body;
  msg.route = 'customerEvent';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/registerevent', (req, res) => {
//   const myquery = { email: req.body.aEmail };
//   const newvalues = {
//     $push: {
//       events: {
//         event_name: req.body.eName,
//       },
//     },
//   };
//   Customers.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Registered customer event!');
//       res.status(200).end('Success!');
//     }
//   });
// });

router.post('/registerevent', (req, res) => {
  const msg = req.body;
  msg.route = 'registerEvent';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Registered customer event!');
      res.status(200).end('Success!');
    }
  });
});

// router.post('/showRegistered', (req, res) => {
//   const data = [];
//   Customers.find({ email: req.body.aEmail }, { events: 1 }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     console.log(customer);
//     customer.forEach((element) => {
//       console.log(element.events);
//       data.push(element.events);
//     });
//     res.send(data);
//   });
// });

router.post('/showRegistered', (req, res) => {
  const msg = req.body;
  msg.route = 'showRegistered';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/customerpage', checkAuth, (req, res) => {
//   const data = [];
//   Restaurants.find({}).exec((error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     restaurant.forEach((rest) => {
//       if (rest.name === req.body.val || rest.location === req.body.val) {
//         data.push(rest.name);
//       }
//     });
//     restaurant.forEach((thing) => {
//       thing.menu.forEach((item) => {
//         if (item.dish_name === req.body.val) {
//           data.push(thing.name);
//         }
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/customerpage', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'customerPage';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/restaurantprof', (req, res) => {
//   Restaurants.find({ name: req.body.name }).exec((error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     res.send(restaurant);
//   });
// });

router.post('/restaurantprof', (req, res) => {
  const msg = req.body;
  msg.route = 'restaurantProf';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/makereview', (req, res) => {
//   const myquery = { email: req.body.customer_email };
//   const newvalues = {
//     $push: {
//       reviews: {
//         date: req.body.date, rating: req.body.rating, comments: req.body.comment, r_name: req.body.r_name,
//       },
//     },
//   };
//   Customers.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Added customer review!');
//       res.status(200).end('Success!');
//     }
//   });
// });

router.post('/makereview', (req, res) => {
  const msg = req.body;
  msg.route = 'makeReview';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Added customer review!');
      res.status(200).end('Success!');
    }
  });
});

// router.post('/rprofreviews', (req, res) => {
//   const data = [];
//   Customers.find({}).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     // console.log(customer);
//     customer.forEach((item) => {
//       item.reviews.forEach((rev) => {
//         if (rev.r_name === req.body.name) {
//           data.push({
//             customer_name: item.name, date: rev.date, rating: rev.rating, comments: rev.comments,
//           });
//         }
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/rprofreviews', (req, res) => {
  const msg = req.body;
  msg.route = 'rProfReviews';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/placeorder', (req, res) => {
//   const myquery = { name: req.body.cName };
//   const newvalues = {
//     $push: {
//       orders: {
//         items: req.body.items, r_name: req.body.rName, date_time: req.body.date_time, delivery_option: req.body.delivery_option, real_datetime: req.body.real_datetime, order_option: 'Order Recieved',
//       },
//     },
//   };
//   Customers.updateOne(myquery, newvalues, (error, restaurant) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     if (restaurant) {
//       console.log('Placed order!');
//       res.status(200).end('Success!');
//     }
//   });
// });

router.post('/placeorder', (req, res) => {
  const msg = req.body;
  msg.route = 'placeOrder';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Added customer review!');
      res.status(200).end('Success!');
    }
  });
});

// router.post('/customerorders', (req, res) => {
//   const data = [];
//   Customers.find({ name: req.body.cName }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     customer.forEach((element) => {
//       element.orders.forEach((order) => {
//         data.push(order);
//       });
//     });
//     res.send(data);
//   });
// });

router.post('/customerorders', (req, res) => {
  const msg = req.body;
  msg.route = 'customerOrders';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

// router.post('/cancelorder', (req, res) => {
//   Customers.updateOne({ 'orders.items': req.body.items }, { $set: { 'orders.$.order_option': 'Cancel' } }).exec((error, customer) => {
//     if (error) {
//       console.log(error);
//       res.status(202).end('Error Occured');
//     }
//     console.log('Order cancelled succesfully!');
//     res.status(200).end('Succesful update in order!');
//   });
// });

router.post('/cancelorder', (req, res) => {
  const msg = req.body;
  msg.route = 'cancelOrder';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log('Order cancelled succesfully!');
      res.status(200).end('Succesful cancelation in order!');
    }
  });
});

router.post('/getrecipients', (req, res) => {
  const msg = req.body;
  msg.route = 'getRecipients';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      res.send(results);
    }
  });
});

router.post('/sendmessage', (req, res) => {
  const msg = req.body;
  msg.route = 'sendMessage';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log(results);
      res.status(200).end('Succesful message sent!');
    }
  });
});

router.post('/getmessages', (req, res) => {
  const msg = req.body;
  msg.route = 'getMessages';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

router.post('/searchuser', checkAuth, (req, res) => {
  const msg = req.body;
  msg.route = 'searchUser';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

router.post('/followuser', (req, res) => {
  const msg = req.body;
  msg.route = 'followUser';
  kafka.make_request('customer', msg, (err, results) => {
    if (err) {
      console.log(err);
      res.status(202).end('Error Occured');
    } else {
      console.log(results);
      res.status(200).end('Succesful user followed!');
    }
  });
});
module.exports = router;
