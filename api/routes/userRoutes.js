'use strict';
module.exports = function(app) {
    let user = require('../controllers/userController');

    app.route('/user/register')
        .post(user.register);

    app.route('/user/authenticate')
        .post(user.authenticate);
};
