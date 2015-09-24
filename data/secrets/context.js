'use strict';
module.exports = function secretsContext() {
    var fs = require('fs');
    var filePath = './data/secrets/dataStore.json';
    var context = {};
    context.usersKeys = {};

    context.saveKeys = function saveKeysInFile(clientId, clientKeys, next) {
        context.usersKeys[clientId] = clientKeys;
        fs.writeFile(filePath, JSON.stringify(context.usersKeys), 'utf8', next(context.usersKeys));
    };
    
    context.loadKeys = function loadFromFile(){
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err) {
                context.usersKeys = {};
            } else {
                context.usersKeys = JSON.parse(data);
            }
        });
    };

    context.keys = require('./repositories/keys')(context);
    return context;
};