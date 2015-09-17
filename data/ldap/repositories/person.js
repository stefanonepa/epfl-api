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

        var results = Array();

        client.search(client.options.searchBase, opts, function (err, res) {
            res.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    results.push(entry.object);
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
            res.on('end', function () {
                next(client.options.capability.view(userFactory(results)));
                //console.log('status: ' + result.status);
            });
        });
    };
    
    personRepo.getUserByName = function (name, next) {
        var opts = {
            filter: '(&(objectClass=posixAccount)(|(cn=' + name + '*)))',
            scope: 'sub'
        };
        
        var groupedUser = Array();
        
        client.search(client.options.searchBase, opts, function (err, res) {
            res.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    if (groupedUser[entry.object.uniqueIdentifier] === undefined) {
                        groupedUser[entry.object.uniqueIdentifier] = Array();
                    }
                    groupedUser[entry.object.uniqueIdentifier].push(entry.object);
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
            res.on('end', function () {
                var users = Array();
                groupedUser.forEach(function(userEntries, index, array) {
                    users.push(client.options.capability.view(userFactory(userEntries)));
                });
                next(users);
                //console.log('status: ' + result.status);
            });
        });
    };

    return personRepo;
};