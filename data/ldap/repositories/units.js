"use strict";
module.exports = function (client) {
    var unitFactory = require('../models/unit');

    var unitsRepo = {};
    unitsRepo.client = client;
    
    var executeQuery = function (req, res, next) {
        var opts = {
            filter: req.ldapQuery,
            scope: 'sub'
        };
        
        var groupedUnit = {};
        
        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    var unitIdentifier = entry.object.uniqueIdentifier;
                    if (groupedUnit[unitIdentifier] === undefined) {
                        groupedUnit[unitIdentifier] = Array();
                    }
                    groupedUnit[unitIdentifier].push(entry.object);
                } else {
                    next(req, res, groupedUnit);
                }
                //console.log('entry: ' + JSON.stringify(entry.object));
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                
                next(req, res, groupedUnit);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var users = Array();
                
                for (var unitEntry in groupedUnit) {
                    if (groupedUnit.hasOwnProperty(unitEntry)) {
                        users.push(client.options.capability.view(unitFactory(groupedUnit[unitEntry])));
                    }
                }
                next(req, res, users);
                //console.log('status: ' + result.status);
            });
        });
    }

    // TODO: get unit by id (note id = fund)
    unitsRepo.getUnitByName = function (req, res, next) {
        req.ldapQuery = '(&(objectClass=organizationalunit)(|(ou=' + req.unit + ')))';
        executeQuery(req, res, next);
    };

    unitsRepo.searchUnitByName = function (req, res, next) {
        req.ldapQuery = '(&(objectClass=organizationalunit)(|(ou=' + req.unit + '*)))';
        executeQuery(req, res, next);
    };

    return unitsRepo;
};