"use strict";
module.exports = function User(ldapUserObject) {
    var userModel = {};
    //TODO: populate the full model
    userModel.username = ldapUserObject.uid[0];
    userModel.sciper = ldapUserObject.uniqueIdentifier;
    userModel.email = ldapUserObject.mail;
    userModel.office = ldapUserObject.roomNumber;
    
    //All ldap properties
    userModel.optionalProperties = ldapUserObject;
    
    userModel.asPublicData = function () {
        return {
            //TODO: Populate the public model
            sciper: userModel.sciper,
            email: userModel.email,
            office: userModel.office
        };
    }

    return userModel;
};