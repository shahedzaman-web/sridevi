const express = require("express");
const router = express.Router();


//Internal imports
  
  const {registerUser,loginUser,getUser}= require("./../controller/userController")

//user register => post
router.post("/register", registerUser);

//user login => post
router.post("/login", loginUser);





//exports route
module.exports = router;