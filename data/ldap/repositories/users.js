"use strict";
module.exports = function (client) {
    var userFactory = require('../models/user');

    var usersRepo = {};
    usersRepo.client = client;

    usersRepo.getUserBySciper = function (req, res, next) {
        var opts = {
            filter: '(&(objectClass=posixAccount)(|(uniqueIdentifier=' + req.sciper + ')))',
            scope: 'sub'
        };

        var results = Array();

        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    results.push(entry.object);
                } else {
                    next(req, res, {});
                }
                //console.log('entry: ' + JSON.stringify(entry.object));
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
 
                next(req, res, {});
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                next(req, res, [client.options.capability.view(userFactory(results))]);
                //console.log('status: ' + result.status);
            });
        });
    };
    
    usersRepo.getUserByName = function (req, res, next) {
        var opts = {
            filter: '(&(objectClass=posixAccount)(|(cn=' + req.name + ')))',
            scope: 'sub'
        };
        
        var groupedUser = Array();
        
        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    if (groupedUser[entry.object.uniqueIdentifier] === undefined) {
                        groupedUser[entry.object.uniqueIdentifier] = Array();
                    }
                    groupedUser[entry.object.uniqueIdentifier].push(entry.object);
                } else {
                    next(req, res, {});
                }
                //console.log('entry: ' + JSON.stringify(entry.object));
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                
                next(req, res, {});
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var users = Array();
                groupedUser.forEach(function(userEntries, index, array) {
                    users.push(client.options.capability.view(userFactory(userEntries)));
                });
                next(req, res, users);
                //console.log('status: ' + result.status);
            });
        });
    };

    usersRepo.searchUserByName = function (req, res, next) {
        var opts = {
            filter: '(&(objectClass=posixAccount)(|(cn=' + req.name + '*)))',
            scope: 'sub'
        };

        var groupedUser = Array();

        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    if (groupedUser[entry.object.uniqueIdentifier] === undefined) {
                        groupedUser[entry.object.uniqueIdentifier] = Array();
                    }
                    groupedUser[entry.object.uniqueIdentifier].push(entry.object);
                } else {
                    next(req, res, []);
                }
                //console.log('entry: ' + JSON.stringify(entry.object));
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);

                next(req, res, []);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var users = Array();
                groupedUser.forEach(function(userEntries, index, array) {
                    users.push(client.options.capability.view(userFactory(userEntries)));
                });
                next(req, res, users);
                //console.log('status: ' + result.status);
            });
        });
    };
    return usersRepo;
};