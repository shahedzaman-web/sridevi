const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//internal import
const User = require("./../model/user.schema");

// Register function
async function registerUser(req, res) {
  // our register logic goes here...
  console.log(req.body);
  try {
    // Get user input
     const { full_name, user_name, password, mobile_number } = req.body;

    // Validate user input
    if (!(user_name && password && full_name && mobile_number)) {
         res.status(400).json({message: "All input is required"});
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ user_name });

    if (oldUser) {
      return res.status(409).json({message: "User Already Exist. Please Login"})
    }
    const user = new User(req.body)
    //Encrypt user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    

    // Create user in our database

    console.log(user);
    await user.save();
    const token = jwt.sign(
      { user_id: user._id, user_name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
      res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

// Login
async function loginUser(req, res) {
  // our login logic goes here
  try {
    // Get user input
    const { mobile_number, password } = req.body;

    // Validate user input
    if (!(mobile_number && password)) {
      res.status(400).json({message: "All input is required"});
    }
    // Validate if user exist in our database
    const user = await User.findOne({ mobile_number });

    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, mobile_number },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json({token : user.token});
    }
    
  } catch (err) {
    res.status(400).json({message: "Invalid Credentials"});
    console.log(err);
  }
}

//export
module.exports = {
  registerUser,
  loginUser
};
