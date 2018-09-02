/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/Users');
const settings = require('../config/settings');

module.exports = {
  login(req, res) {
    UserAuth.findOne({
      email: req.body.email,
    }, (err, user) => {
      if (err) throw err;

      if (!user) {
        return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          const token = jwt.sign(user.toJSON(), settings.secret, {
            expiresIn: '180m',
          });
          res.setHeader('x-auth-token', ('JWT ' + token));
          // return the information including token as JSON

          return res.json({
            success: true, token: `JWT ${token}`, msg: `Welcome ${user.firstName} ${user.lastName}!`, _id: user._id,
          });
        }
        return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
      });
    });
  },
};
