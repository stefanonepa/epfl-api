var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;

describe('API / Unit', function(){

    // Testing getUnitByName
    it('should be able to read JSON data',function(done){
        request.get('http://localhost:3000/api/public/units/name/igm-ge', function(err, json, headers) {
            /*
             * HOW AWFUL IS THAT ?
             */
            //console.log(json.body);
            var chunk = json.body.substring(1,json.body.length-1);
            //console.log(chunk);
            var strung = JSON.parse(chunk);
            //console.log(strung);
            assert.equal(strung.cn, 'igm-ge', 'Checking cn value');
            done();
        });
    });

    // ToDo: Test searchUnitByName - more than one entry !
});