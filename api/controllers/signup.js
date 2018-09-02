/* eslint-disable consistent-return,no-param-reassign */
const UserAuth = require('../models/Users');
const login = require('./login');

module.exports = {
  saveUser(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
      UserAuth.findOne(
        {
          email: req.body.email,
        }, async (err, user) => {
          if (user) return res.status(401).send({ success: false, msg: 'A User with this email already exist' });
          const newPass = new UserAuth();
          const newUser = new UserAuth({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: newPass.generateHash(req.body.password),
          });
          if (req.body.adminCode === 'adminuser') {
            newUser.role = 4;
          }

          try {
            await newUser.save();
            login.login(req, res);
          } catch (e) {
            res.json({ success: false, msg: 'error occurred trying to sign up' });
          }
        },
      );
    }
  },
};
