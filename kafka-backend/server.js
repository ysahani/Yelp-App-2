"use strict";
var connection = new require("./kafka/connection");
var connectMongoDB = require("./Utils/mongoConnection");

//import topics files
const signupService = require("./services/signup");
const loginService = require("./services/login");

//MongoDB connection
connectMongoDB();

//Handle topic request
const handleTopicRequest = (topic_name, fname) => {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("Kafka Server is running ");
  consumer.on("message", function (message) {
    console.log("Message received for " + topic_name);
    var data = JSON.parse(message.value);
    fname.handle_request(data.data, (err, res) => {
      response(data, res, err, producer);
      return;
    });
  });
};

const response = (data, res, err, producer) => {
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
        err: err
      }),
      partition: 0
    }
  ];
  producer.send(payloads, function (err, data) {
    if (err) {
      console.log("Error when producer sending data", err);
    } else {
      console.log(data);
    }
  });
  return;
}

// Topics
handleTopicRequest("signup", signupService);
handleTopicRequest("login", loginService);
