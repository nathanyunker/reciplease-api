'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config/main');
const User = require('../models/userModel');

exports.register = function(req, res) {
    if(!req.body.email || !req.body.password) {
        res.json({ success: false, message: 'Please enter email and password.' });
      } else {
        var newUser = new User({
          email: req.body.email,
          password: req.body.password
        });
    
        // Attempt to save the user
        newUser.save(function(err) {
          if (err) {
            return res.json({ success: false, message: 'That email address already exists.'});
          }
          res.json({ success: true, message: 'Successfully created new user.' });
        });
      }
};

exports.update_reddit_secret = function(req, res) {
    //add addition jwt auth middleware here
    if(true) {
        return User.findOne({email: req.body.email})
            .then(user => {
                return user.update({redditSecret: req.body.secret});
            })
            .then(updateResult => {
                return res.status(200).json({success: `secret updated to ${req.body.secret}`});
            })
            .catch(err => {
                return res.status(500).json(err);
            })
    } else {
       return  res.status(403).json({ error: 'Forbidden' });
    }
};

exports.authenticate = function(req, res) {
    let response = {};
    let statusCode = 200;

    User.findOne({ email: req.body.email}, (err, user) => {
        if (err) throw err;

        if (!user) {
            statusCode = 401;
            response.messages = [{message: 'Authentication failed. User not found.'}];
            res.status(statusCode).json(response);
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user.toJSON(), config.auth.secret, {
                        expiresIn: 10080 // in seconds
                    });
                    response.token = 'JWT ' + token;
                    response.user = user;
                    res.status(statusCode).json(response);
                } else {
                    statusCode = 401;
                    response.messages = 'Authentication failed. Passwords did not match.';
                    res.status(statusCode).json(response);
                }
            });
        }
    });
};