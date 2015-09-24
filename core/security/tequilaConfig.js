'use strict';

module.exports = function tequilaConfig(app) {

    var passport = require('passport');
    var util = require('util');
    var TequilaStrategy = require('passport-tequila').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    function myVerify(accessToken, refreshToken, profile, done) {
        // Pretend the verification is asynchronous (as would be required
        // e.g. if using a database):
        process.nextTick(function() {
            done(null, profile);
        });
    }

    var tequila = new TequilaStrategy({
        service: "EPFL ldap API",
        request: ["displayname"]
        // require: "group=openstack-sti",  // Uncomment and use a group you are a member of.
    }, myVerify);
    passport.use(tequila);

    app.use(passport.initialize());
    app.use(passport.session());

    app.tequilaStrategy = tequila;
};