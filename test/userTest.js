var assert = require('assert');
var request = require('request');
var expect = require('chai').expect;

function debug(msg) {
    //console.log(msg);
}

describe('Initial checks', function () {
    it('should respond to GET', function (done) {
       request.get('http://localhost:3000', function (err, res) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('and it should return 200', function (done) {
        request.get('http://localhost:3000/api/public/users/sciper/169419', function (err, res, body) {
            assert.ok(res.statusCode===200, "Request status 200");
            done();
        });
    });
});

describe('API / User', function(){

    // Testing getUserBySciper
    it('should be able to read JSON data',function(done){
        request.get('http://localhost:3000/api/public/users/sciper/169419', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            debug(JSON.stringify(dataArray[0]));

            assert.equal(dataArray[0].displayName, 'Nicolas Borboën', 'Checking displayName value');
            done();
        });
    });

    // Test guest sciper
    it('handle errors in query parameters',function(done){
        request.get('http://localhost:3000/api/public/users/sciper/Z18171', function(err, json, headers) {
            debug(json.body);
            debug(JSON.parse(json.body));
            assert(JSON.parse(json.body).error.toLowerCase().indexOf("parameter") >= 0);
            done();
        });
    });

    // Test guest sciper
    it('should be able to read JSON data with guest sciper',function(done){
        request.get('http://localhost:3000/api/public/users/sciper/G18171', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            debug(JSON.stringify(dataArray[0]));

            assert.equal(dataArray[0].displayName, 'Nicolas Borboen', 'Checking displayName value');
            done();
        });
    });

    // Test getUserByName
    it('should be able to get user by Name',function(done){
        request.get('http://localhost:3000/api/public/users/name/bancal', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            debug(JSON.stringify(dataArray[0]));

            assert.equal(dataArray[0].displayName, 'Samuel Bancal', 'Checking displayName value');
            done();
        });
    });


    // Test searchUserByName
    it('should be able to search user by Name',function(done){
        request.get('http://localhost:3000/api/public/users/search/banc', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            debug(JSON.stringify(dataArray[0]));

            assert.equal(dataArray[0].displayName, 'Samuel Bancal', 'Checking displayName value');
            done();
        });
    });
});
