"use strict";
module.exports = function User(ldapUserObject) {
    var userModel = {};

    userModel.username = ldapUserObject.uid[0];
    userModel.sciper = ldapUserObject.uniqueIdentifier;
    userModel.email = ldapUserObject.email;
    userModel.optionalProperties = ldapUserObject;
    
    userModel.asPublicData = function () {
        return {
            sciper: userModel.sciper,
            email: userModel.email

        };
    }

    return userModel;
};