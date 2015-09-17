"use strict";
module.exports = function User(ldapUserArray) {
    var userModel = {};
    //TODO: populate the full model
    userModel.displayName = ldapUserArray[0].displayName;
    userModel.username = ldapUserArray[0].uid[0];
    userModel.sciper = ldapUserArray[0].uniqueIdentifier;
    userModel.email = ldapUserArray[0].mail;
    userModel.accreds = Array();
    userModel.memberOf = Array();

    if (ldapUserArray[0].memberOf !== undefined) {
        ldapUserArray[0].memberOf.forEach(function (groupName, index, groupArray) {
            userModel.memberOf.push(groupName);
        });
    }

    ldapUserArray.forEach(function (userEntry, index, array) {
        
        userModel.accreds.push(
            {
                unitAcronym: userEntry.ou[0],
                unitNameEN: userEntry['ou;lang-en'],
                phone: userEntry.telephoneNumber,
                office: userEntry.roomNumber,
                address: userEntry.postalAddress ? userEntry.postalAddress.replace(/\$/g, '\n') : '',
                position: userEntry['title;lang-en'],
                status: userEntry.organizationalStatus
            }
        );
    });

    //All ldap properties
    userModel.optionalProperties = ldapUserArray;
    
    userModel.asPublicData = function () {
        return {
            displayName: userModel.displayName,
            username: userModel.username,
            sciper: userModel.sciper,
            email: userModel.email,
            accreds: userModel.accreds
        };
    }
    
    return userModel;
};