"use strict";
const { menu } = require("./Menu");
const { updateProfile } = require("./UpdateProfile");
const { addEvent } = require("./AddEvent");
const { restaurantEvents } = require("./RestaurantEvents");
const { registeredList } = require("./RegisteredList");
const { viewCustomer } = require("./ViewCustomer");
const { addMenuItem } = require("./AddMenuItem");
const { restaurantOrders } = require("./RestaurantOrders");
const { updateOrder } = require("./UpdateOrder");
const { filterOrder } = require("./FilterOrder");
const { editDish } = require("./EditDish");
const { updateDish } = require("./UpdateDish");
const { reviews } = require("./Reviews");
const { sendMessage } = require("./SendMessage");
const { getRecipients } = require("./GetRecipients");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "menu":
      menu(msg, callback);
      break;
    case "updateProfile":
      updateProfile(msg, callback);
      break;
    case "addEvent":
      addEvent(msg, callback);
      break;
    case "restaurantEvents":
      restaurantEvents(msg, callback);
      break;
    case "registeredList":
      registeredList(msg, callback);
      break;
    case "viewCustomer":
      viewCustomer(msg, callback);
      break;
    case "addMenuItem":
      addMenuItem(msg, callback);
      break;
    case "restaurantOrders":
      restaurantOrders(msg, callback);
      break;
    case "updateOrder":
      updateOrder(msg, callback);
      break;
    case "filterOrder":
      filterOrder(msg, callback);
      break;
    case "editDish":
      editDish(msg, callback);
      break;
    case "updateDish":
      updateDish(msg, callback);
      break;
    case "reviews":
      reviews(msg, callback);
      break;
    case "sendMessage":
      sendMessage(msg, callback);
      break;
    case "getRecipients":
      getRecipients(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;