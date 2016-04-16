'use strict';

module.exports = function(app) {
    var admins = ['150938'];
    var passport = require('passport');
    var TequilaStrategy = require('passport-tequila').Strategy;

    passport.serializeUser(function(user, done) {

        user.sciper = user.tequila.uniqueid;
        
        //Tequila options management
        user.roles ={};
        if (admins.indexOf(user.sciper) >= 0) {
             user.roles.admin = true;
        }
        
        if(user.tequila["role-respinfo"].length > 0){
            user.roles.respinfo = user.tequila["role-respinfo"].split(',');
        }
        
        if(user.tequila["role-respsecu"].length > 0){
            user.roles.respsecu = user.tequila["role-respsecu"].split(',');
        }
        
        if(user.tequila["group"].length > 0){
            user.groups = user.tequila["group"].split(',');
        }
        
        if(user.tequila["allunits"].length > 0){
            user.units = user.tequila["allunits"].split(',');
        }
       
        done(null, user);
    });
    
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    var tequila = new TequilaStrategy({
        service: "EnacnasStat",
        request: ["displayname,uniqueid,allunits,role-respinfo,role-respsecu,group"]//,
        //require: "role-respinfo,role-respsecu,group=enacit2",  // Uncomment and use a group you are a member of.
    });
    passport.use(tequila);

    app.use(passport.initialize());
    app.use(passport.session());

    return tequila;
};