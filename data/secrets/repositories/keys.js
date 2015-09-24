'use strict';
module.exports = function keysRepository() {
    var keysRepo = {};
    var keys = ['f7a4e624-2c83-47c2-8b00-ab0d517e63c6', 'fc2f85cf-85ce-4000-ab2e-92e7b74f3e37', '30d43ffc-e87d-4694-a5ee-6b9c147acb73'];

    keysRepo.getKeysForUser = function (req, res, next) {
        next(keys);
    };
    
    return keysRepo;
};