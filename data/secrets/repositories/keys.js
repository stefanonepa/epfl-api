'use strict';
module.exports = function keysRepository(keysContext) {
    var keysRepo = {};

    keysRepo.getKeysForUser = function (req, res, next) {
        var clientKeys = [];
        if (keysContext.usersKeys[req.user.tequila.uniqueid] == undefined) {
            keysContext.saveKeys(req.user.tequila.uniqueid, clientKeys, next);
        } else {
            clientKeys = keysContext.usersKeys[req.user.tequila.uniqueid];
            next(clientKeys);
        }
    };

    keysRepo.addKeysForUser = function (req, res, next) {
        var uuid = require('node-uuid');
        var clientKeys = keysContext.usersKeys[req.user.tequila.uniqueid] || [];
        clientKeys.push(uuid.v4());
        keysContext.saveKeys(req.user.tequila.uniqueid, clientKeys, next);
    };

    keysRepo.deleteKeysForUser = function (req, res, next) {
        var clientKeys = keysContext.usersKeys[req.user.tequila.uniqueid].filter(function (i) {
            return i != req.apiKeyToDelete;
        });
        
        keysContext.saveKeys(req.user.tequila.uniqueid, clientKeys, next);
    };
    
    keysRepo.isValid = function (key) {
        var keys = Object.keys(keysContext.usersKeys);
        var len = keys.length;
        var i = 0;
        var prop;
        var valid = false;

        while (i < len && valid === false) {
            prop = keys[i];
            keysContext.usersKeys[prop].filter(function (currentKey) {
                if (currentKey == key) {
                    valid = true;
                }
            });
            i += 1;
        }
        
        return valid;
    };

    return keysRepo;
};