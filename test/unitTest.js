'use strict';

var assert = require('assert');
var request = require('request');

function debug(msg) {
    //console.log(msg);
}

describe('API / Unit', function(){
    // Testing getUnitByName
    it('should be able to read JSON data',function(done){
        request.get('http://localhost:3000/api/public/units/name/igm-ge', function(err, json, headers) {
            var dataArray = JSON.parse(json.body);
            assert.equal(dataArray[0].cn, 'igm-ge', 'Checking cn value');
            done();
        });
    });

    // Testing searchUnitByName
    it('should be able to read JSON data',function(done){
        request.get('http://localhost:3000/api/public/units/search/igm', function(err, json, headers) {
            assert.notEqual(json.body.search('ou=igm-ge,ou=igm,ou=sti,o=epfl,c=ch'), -1, 'IGM-GE must be found by searching 'igm' keyword');
            done();
        });
    });

    // Testing searchUnitByName
    it('should be able to read JSON data', function (done) {
        request.get('http://localhost:3000/api/public/units/id/0184', function (err, json, headers) {
            assert.notEqual(json.body.search('ENAC-IT'), -1, 'ENAC-IT must be found by searching '0184' id');
            done();
        });
    });
});