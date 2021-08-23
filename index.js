const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const InitiateMongoServer = require("./config/db");

require("dotenv").config();
InitiateMongoServer();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// PORT
const PORT = process.env.PORT || 4000;


//internal import
const userAuth =require("./routes/userRoute")



app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

//route setup
app.use("/api/user", userAuth);




app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
