const userModel = require('../models/userModel');
const userService = require('../services/userServices');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokenModel');
const { cookieOptions } = require('../utils/cookieOptions');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });
  if (isUserAlreadyExist) {
    return res.status(400).json({ message: 'User Already exists' });
  }

  const hashed = await userModel.hashPassword(password);

  const user = await userService.createUser({
    
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: hashed
  });

  const token = user.generateAuthToken();

  // ✅ Properly set cookie with secure settings
  res.cookie('token', token,cookieOptions);

  // res.status(201).json({ token, user });

   res.status(201).json({
    token,
    user: {
      _id: user._id,
      email: user.email,
      fullName: {
        firstName: user.firstName,
        lastName: user.lastName
      }
    }
  });
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // ✅ fixed from 4000
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = user.generateAuthToken();

//   ✅ Cookie needs full options
// cookie mein full options nahi diye the bydefault waale leleta hai pr fir baad mein dikkt or error dono aati hai to hamesha cookie options do or ek js file se import kro taaki baad mmein deploymen tk wqt ek jagahj change ho to sb jagazh effect ho 


  res.cookie('token', token,cookieOptions);

  // res.status(200).json({ token, user });


  res.status(200).json({
  token,
  user: {
    _id: user._id,
    email: user.email,
    fullName: {
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
});

};

module.exports.getUserProfile = async (req, res, next) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    fullName: {
      firstName: req.user.fullName.firstName,
      lastName: req.user.fullName.lastName
    }
  });
};

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');

  // ✅ extract token from cookie or Authorization header
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.status(200).json({ message: 'Logged Out' });
};
