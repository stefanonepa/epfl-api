"use strict";
module.exports = function (options) {
    var personRepo = {};

    var client = require("../ldapClient").getClient(options.serverUrl);

    personRepo.getUserBySciper = function (sciper, next) {
        var opts = {
            filter: '(&(objectClass=posixAccount)(|(uniqueIdentifier=' + sciper + ')))',
            scope: 'sub'
        };
        
        client.search(options.searchBase, opts, function (err, res) {
            res.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    next(entry.object);
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

    return personRepo;
};