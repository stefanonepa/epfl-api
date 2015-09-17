"use strict";
module.exports = function (client) {
    var unitFactory = require('../models/unit');

    var unitRepo = {};
    unitRepo.client = client;

    // TODO: get unit by id (note id = fund)
    unitRepo.getUnitByName = function (req, res, next) {
        var opts = { // ldapsearch -h ldap.epfl.ch -b 'o=epfl,c=ch' -LLL -x '(&(objectclass=organizationalunit))'
            filter: '(&(objectClass=organizationalunit)(|(ou=' + req.unit + ')))',
            scope: 'sub'
        };

        var groupedUnit = Array();

        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    if (groupedUnit[entry.object.uniqueIdentifier] === undefined) {
                        groupedUnit[entry.object.uniqueIdentifier] = Array();
                    }
                    groupedUnit[entry.object.uniqueIdentifier].push(entry.object);
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
                var units = Array();
                groupedUnit.forEach(function(unitEntries, index, array) {
                    units.push(client.options.capability.view(unitFactory(unitEntries)));
                });
                next(req, res, units);
                //console.log('status: ' + result.status);
            });
        });
    };

    unitRepo.searchUnitByName = function (req, res, next) {
        var opts = { // ldapsearch -h ldap.epfl.ch -b 'o=epfl,c=ch' -LLL -x '(&(objectclass=organizationalunit))'
            filter: '(&(objectClass=organizationalunit)(|(ou=' + req.unit + '*)))',
            scope: 'sub'
        };

        var groupedUnit = Array();

        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    if (groupedUnit[entry.object.uniqueIdentifier] === undefined) {
                        groupedUnit[entry.object.uniqueIdentifier] = Array();
                    }
                    groupedUnit[entry.object.uniqueIdentifier].push(entry.object);
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
                var units = Array();
                groupedUnit.forEach(function(unitEntries, index, array) {
                    units.push(client.options.capability.view(unitFactory(unitEntries)));
                });
                next(req, res, units);
                //console.log('status: ' + result.status);
            });
        });
    };

    return unitRepo;
};