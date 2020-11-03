"use strict";
const { menu } = require("./Menu");

let handle_request = (msg, callback) => {
  switch (msg.route) {
    case "menu":
      menu(msg, callback);
      break;
  }
};

exports.handle_request = handle_request;