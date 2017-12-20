'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      index: { unique: true }
    },
    gender: {
      type: String
    },
    address: {
      type: String
    }
  });

module.exports = mongoose.model('User', UserSchema);