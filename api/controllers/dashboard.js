/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/Users');
const settings = require('../config/settings');
const config = require('../config/role');

const getToken = (headers) => {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
    return null;
  }
  return null;
};

module.exports = {
  User(req, res) {
    const token = getToken(req.headers);
    if (token) {
      const decoded = jwt.verify(token, settings.secret);

      // decode local-user using token
      if (decoded) {
        return UserAuth.findOne({ email: decoded.email }, async (err, user) => {
          if (err) return 'invalid login details';
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed user not found' });
          }
          return res.json(
            { success: true, msg: `Welcome ${user.firstName} ${user.lastName}!`, user: user._id, firstName: user.firstName, lastName: user.lastName }
          );
        });
      }
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized User failed to login.' });
    }
  },

  // admin access level
  requireAdmin(req, res) {
    const token = getToken(req.headers);
    if (token) {
      const decoded = jwt.verify(token, settings.secret);
      if (decoded) {
        return UserAuth.findOne({ email: decoded.email }, async (err, user) => {
          if (err) return 'invalid login details';
          if (!user) {
            return res.status(403).send({ success: false, msg: 'Authentication failed user not found' });
          }
          if (config.accessLevels.admin.indexOf(decoded.role) === -1) {
            return res.status(403).send({ success: false, msg: 'You are not an Admin' });
          }
          return res.json(
            { success: true, msg: `Welcome Admin ${user.firstName} ${user.lastName}!`, user: user._id, firstName: user.firstName, lastName: user.lastName }
          );
        });
      }
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized User failed to login.' });
    }
  },
};
