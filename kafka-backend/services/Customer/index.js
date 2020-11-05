"use strict";
const { updateCustomer } = require("./UpdateCustomer");
const { customerEvents } = require("./CustomerEvents");
const { customerEvent } = require("./CustomerEvent");
const { registerEvent } = require("./RegisterEvent");
const { showRegistered } = require("./ShowRegistered");
const { customerPage } = require("./CustomerPage");
const { restaurantProf } = require("./RestaurantProf");
const { makeReview } = require("./MakeReview");
const { rProfReviews } = require("./RProfReviews");
const { placeOrder } = require("./PlaceOrder");
const { customerOrders } = require("./CustomerOrders");
const { cancelOrder } = require("./CancelOrder");
const { getRecipients } = require("./GetRecipients");
const { sendMessage } = require("./SendMessage");
const { getMessages } = require("./GetMessages");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "updateCustomer":
      updateCustomer(msg, callback);
      break;
    case "customerEvents":
      customerEvents(msg, callback);
      break;
    case "customerEvent":
      customerEvent(msg, callback);
      break;
    case "registerEvent":
      registerEvent(msg, callback);
      break;
    case "showRegistered":
      showRegistered(msg, callback);
      break;
    case "customerPage":
      customerPage(msg, callback);
      break;
    case "restaurantProf":
      restaurantProf(msg, callback);
      break;
    case "makeReview":
      makeReview(msg, callback);
      break;
    case "rProfReviews":
      rProfReviews(msg, callback);
      break;
    case "placeOrder":
      placeOrder(msg, callback);
      break;
    case "customerOrders":
      customerOrders(msg, callback);
      break;
    case "cancelOrder":
      cancelOrder(msg, callback);
      break;
    case "getRecipients":
      getRecipients(msg, callback);
      break;
    case "sendMessage":
      sendMessage(msg, callback);
      break;
    case "getMessages":
      getMessages(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;