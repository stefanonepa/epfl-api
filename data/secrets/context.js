'use strict';
module.exports = function secretsContext() {
    var fs = require('fs');
    var filePath = './data/secrets/dataStore.json';
    var context = {};
    context.usersKeys = {};

    context.saveKeys = function saveKeysInFile(clientId, clientKeys, next) {
        context.usersKeys[clientId] = clientKeys;

        fs.writeFile(filePath, JSON.stringify(context.usersKeys), 'utf8', function () {
            next(context.usersKeys);
        });
    };
    
    context.loadKeys = function loadFromFile(){
        try{
            context.usersKeys = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            context.usersKeys = {};
        }
    };

    context.keys = require('./repositories/keys')(context);
    return context;
};