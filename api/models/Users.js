// load the things we need
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userRoles = require('../config/role')

const Schema = mongoose.Schema;

// define the schema for our user model
const UserSchema = new Schema({
    email: {
      type: String,
      // unique: true,
      match: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
    },
    password: String,
    firstName: String,
    lastName: String,
    adminCode: String,
    terms_condition: Boolean,
    role: {
      type: Number,
      default: userRoles.userRoles.user
    }
});

// generating a hash
UserSchema.methods.generateHash = password => bcrypt.hashSync(
  password, bcrypt.genSaltSync(8), null,
);

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
const UserAuth = mongoose.model('shakacode', UserSchema);

module.exports = UserAuth;
