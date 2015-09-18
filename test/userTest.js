var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;

describe('Initial checks', function () {
    it('should respond to GET',function(done){
        request.get('http://localhost:3000/', function (err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('and it should return 200', function () {
        request.get('http://localhost:3000/api/public/users/sciper/169419', function (err, res, body) {
            assert.ok(res.statusCode===200, "Request status 200");
        });
    });
});

describe('API / User', function(){

    // Testing getUserBySciper
    it('should be able to read JSON data',function(done){
        request.get('http://localhost:3000/api/public/users/sciper/169419', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            //console.log(JSON.stringify(dataArray[0]));

            assert.equal(dataArray[0].displayName, 'Nicolas Borboën', 'Checking displayName value');
            done();
        });
    });

    // ToDo: Test getUserByName
    // ToDo: Test searchUserByName
});