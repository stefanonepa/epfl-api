"use strict";
module.exports = function (client) {
    var userFactory = require('../models/user');

    var personRepo = {};
    personRepo.client = client;

    personRepo.getUserBySciper = function (sciper, next) {
        var opts = {
            filter: '(&(objectClass=posixAccount)(|(uniqueIdentifier=' + sciper + ')))',
            scope: 'sub'
        };
        
        client.search(client.options.searchBase, opts, function (err, res) {
            res.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    next(client.options.capability.view(userFactory(entry.object)));
                } else {
                    next({});
                }
                //console.log('entry: ' + JSON.stringify(entry.object));
            });
            res.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
                console.error('error: ' + err.message);
 
                next(new Object());
            });
            res.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            res.on('end', function (result) {
                //console.log('status: ' + result.status);
            });
        });
    };
    
    //personRepo.getUserBySciper = function (sciper, next) {
    //    //TODO: Add a dev or offline mod that answer always a mock or fake object
    //    var mockObject = {};
        
    //    mockObject.username = "bob";
    //    mockObject.sciper = sciper;
    //    mockObject.email = "bob.marley@epfl.ch";
    //    mockObject.optionalProperties = {
    //        caca: "boudin",
    //        pipi: "boudi"
    //    };
        
    //    mockObject.asPublicData = function () {
    //        return {
    //            sciper: mockObject.sciper,
    //            email: mockObject.email

    //        };
    //    };
    //    next(client.options.capability.view(mockObject));
    //};

    return personRepo;
};