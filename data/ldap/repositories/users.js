'use strict';
module.exports = function (context) {
    var ldapContext = require('epfl-ldap')();

    var userFactory = require('../models/user');
    var usersRepo = {};
    var client = context.client;

    usersRepo.getUserBySciper = function (req, res, next) {
        ldapContext.users.getUserBySciper(req.sciper, function(data) {
            if (data.length == 0) {
                next(new Error("not found"));
            } else if (data.length == 1) {
                next(req, res, [client.options.capability.view(data[0])]);
            } else {
                next(new Error("too many found"));
            }
        });
    };
    
    usersRepo.getUserByName = function (req, res, next) {
        req.ldapQuery = '(&(objectClass=posixAccount)(|(cn=' + req.name + ')))';
        executeQuery(req, res, next);
    };

    usersRepo.searchUserByName = function (req, res, next) {
        req.ldapQuery = '(&(objectClass=posixAccount)(|(cn=' + req.name + '*)))';
        executeQuery(req, res, next);
    };

    usersRepo.searchUserByPhone = function (req, res, next) {
        req.ldapQuery = '(&(objectClass=posixAccount)(|(telephoneNumber=*' + req.phone + '*)))';
        executeQuery(req, res, next);
    };
    
    usersRepo.searchUserByUnitAcronym = function (req, res, next) {
        req.ldapQuery = '(&(objectClass=posixAccount)(|(ou=' + req.unitAcronym + ')))';
        executeQuery(req, res, next);
    };

    var executeQuery = function (req, res, next) {
        var opts = {
            filter: req.ldapQuery,
            scope: 'sub'
        };
        
        var groupedUser = {};
        
        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    var userIdentifier = entry.object.uniqueIdentifier;
                    if (groupedUser[userIdentifier] === undefined) {
                        groupedUser[userIdentifier] = Array();
                    }
                    groupedUser[userIdentifier].push(entry.object);
                } else {
                    next(req, res, groupedUser);
                }
                //console.log('entry: ' + JSON.stringify(entry.object));
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                
                next(req, res, groupedUser);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var users = Array();
                
                for (var userEntry in groupedUser) {
                    if (groupedUser.hasOwnProperty(userEntry)) {
                        users.push(client.options.capability.view(userFactory(groupedUser[userEntry])));
                    }
                }
                next(req, res, users);
                //console.log('status: ' + result.status);
            });
        });
    };

    return usersRepo;
};