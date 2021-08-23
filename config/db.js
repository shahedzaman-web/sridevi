const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = "mongodb+srv://admin:9i-projects95SR248FOR99@sridevi.jlbyn.mongodb.net/sridevi?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  mongoose
  .connect(MONGOURI, {
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