const jwt = require('jsonwebtoken');
const LocalStrategy   = require('passport-local').Strategy;
const User = require('../../models/userModel');
const bCrypt = require('bcrypt-nodejs');
const config = require('../../../config');

module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            session: false,
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            console.log('req', req.body);
            console.log('username', username);
            console.log('password', password);
            console.log('done', done);
            // check in mongo if a user with username exists or not
            User.findOne({ 'username' :  username }, 
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with username '+ username);
                        req.flash('message', 'User Not found.')
                        return done(null, false, req.flash());                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    const token = jwt.sign(payload, config.jwt.jwtSecret);
                    return done(null, token, user);
                }
            );

        })
    );


    let isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    } 
}