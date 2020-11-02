const mongoose = require("mongoose");
const { mongoDB } = require("./config");

//Mongo Connection
const connectMongoDB = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 500,
        bufferMaxEntries: 0,
      };
      
  try {
    await mongoose.connect(mongoDB, options);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Could not connect to MongoDB", err);
  }
};

module.exports = connectMongoDB;