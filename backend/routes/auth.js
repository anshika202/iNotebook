const express = require('express');
const router = express.Router();  //A router is a mini Express application that can be used for handling routes (URL paths) and middleware specific to those routes.
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchuser = require('../Middleware/fetchuser')

let jwt_secret = 'goodgirl';




// ROUTE 1: create a user : POST '/api/auth/createUser'

router.post('/createUser', [
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 5 })
], async (req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
  }
  // check whether the user with this email exists or not

  try {
    let user = await User.findOne({ email: req.body.email });
    
    if (user) {
      return res.status(400).json({ error: " user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password,salt)

    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    })

    const data ={
      user :{
        id : user.id
      }
    }

    const authToken = jwt.sign(data,jwt_secret);
    console.log(authToken);

    res.json(user)

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error");

  }
})

// ROUTE 2 : authenticate a user (no login required) : POST '/api/auth/login'

router.post('/login', [
  body("email",'enter valid email').isEmail(),
  body("password",'password cannot be blank').exists()
], async (req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email})

    if(!user)
    {
      return res.status(400).json({error : 'Invalid credentials'})
    }

    const passCompare = await bcrypt.compare(password, user.password);

    if(!passCompare)
    {
      return res.status(400).json({error : 'Invalid credentials'});
    }

    const data ={
      user :{
        id : user.id
      }
    }

    const authToken = jwt.sign(data,jwt_secret);

    res.json({authToken : authToken})

  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error");
  }
})

// ROUTE 3 : Get logged-in user data using credentials : POST '/api/auth/getdata' . Login required

router.post('/getdata', fetchuser, async (req, res) => {

try {
  const userId = req.user.id;

  const user = await User.findById(userId).select("-password");
  res.send(user)
  
} catch (error) {
  console.error(error.message)
    res.status(500).send("Internal server error");
}

})


module.exports = router