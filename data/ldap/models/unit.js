"use strict";
module.exports = function Unit(ldapUnitArray) {
    var unitModel = {};
    //TODO: populate the full model
    unitModel.cn = ldapUnitArray[0].cn;
    unitModel.dn = ldapUnitArray[0].dn;
    unitModel.ou = ldapUnitArray[0].ou[0];
    unitModel.sciper = ldapUnitArray[0]['ou;lang-en'];
    unitModel.uniqueIdentifier = ldapUnitArray[0].uniqueIdentifier;
    unitModel.accountingNumber = ldapUnitArray[0].accountingNumber;
    unitModel.gidNumber = ldapUnitArray[0].gidNumber;
    unitModel.memberUid = ldapUnitArray[0].memberUid;

    //All ldap properties
    unitModel.optionalProperties = ldapUnitArray;

    unitModel.asPublicData = function () {
        return {
            cn: unitModel.cn,
            dn: unitModel.dn,
            ou: unitModel.ou
        };
    };

    return unitModel;
};