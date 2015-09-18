"use strict";

var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;

describe('API / Unit', function(){
    // Testing getUnitByName
    it('should be able to read JSON data',function(done){
        request.get('http://localhost:3000/api/public/units/name/igm-ge', function(err, json, headers) {
            var dataArray = JSON.parse(json.body);
            assert.equal(dataArray[0].cn, 'igm-ge', 'Checking cn value');
            done();
        });
    });

    // ToDo: Test searchUnitByName - more than one entry !
});