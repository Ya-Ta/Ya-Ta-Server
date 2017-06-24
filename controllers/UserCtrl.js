'use strict';

const userModel = require('../models/userModel');
const config = require('../config/config');

/*******************
 *  Register
 ********************/
exports.register = async(req, res, next) => {
  if (req.body.pw1 != req.body.pw2) {
    return next(1204);
  }


  let result = '';
  try {
    const user_data = {
      user_name: req.body.user_name,
      user_password: config.do_cipher(req.body.pw2),
      user_email: req.body.user_email
    };

    result = await userModel.register(user_data);

  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};

/*******************
 *  Login
 ********************/
exports.login = async(req, res, next) => {
  let result = '';

  try {
    const user_data = {
      user_email: req.body.user_email,
      user_password: config.do_cipher(req.body.pw)
    };

    result = await userModel.login(user_data);
  } catch (error) {
    return next(error);
  }

  // success
  return res.json(result);
};