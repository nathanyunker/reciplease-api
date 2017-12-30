'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({  
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Client', 'Manager', 'Admin'],
      default: 'Client'
    }
  });
  
  // Saves the user's password hashed (plain text password storage is not good)
  UserSchema.pre('save', function (next) {  
    var user = this;
    if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
  // Create method to compare password input to password saved in database
  UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };

module.exports = mongoose.model('User', UserSchema);