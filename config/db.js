const mongoose = require("mongoose");

// Replace this with your MONGOURI.


const InitiateMongoServer = async () => {
  mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("database connected");
  })
  .catch(err => {
    console.log("Could not connect", err);
  });
};

module.exports = InitiateMongoServer;