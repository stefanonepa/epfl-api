'use strict';
module.exports = function keysRepository(apiKeys) {
    var keysRepo = {};

    keysRepo.getKeysForUser = function (req, res, next) {
        console.log(req.user.tequila.uniqueid);
        var clientKeys = apiKeys[req.user.tequila.uniqueid] || [];
        apiKeys[req.user.uniqueid] = clientKeys; //TODO: Verify if reference
        next(clientKeys);
    };

    keysRepo.addKeysForUser = function (req, res, next) {
        var uuid = require('node-uuid');
        var clientKeys = apiKeys[req.user.tequila.uniqueid] || [];
        clientKeys.push(uuid.v4());
        apiKeys[req.user.uniqueid] = clientKeys; //TODO: Verify if reference
        next(clientKeys);
    };

    keysRepo.deleteKeysForUser = function (req, res, next) {
        var clientKeys = apiKeys[req.user.tequila.uniqueid] || [];
        delete clientKeys[req.apiKeyToDelete];
        apiKeys[req.user.uniqueid] = clientKeys; //TODO: Verify if reference
        next(clientKeys);
    };
    
    return keysRepo;
};