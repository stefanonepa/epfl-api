'use strict';

var assert = require('assert');
var request = require('request');

function debug(msg) {
    //console.log(msg);
}

describe('Initial checks', function () {
    it('should respond to GET', function (done) {
       request.get('http://localhost:3000', function (err, res) {
           assert.equal(res.statusCode, 200, 'Testing that API respond (status 200)');
           done();
        });
    });
    it('and it should return 200', function (done) {
        request.get('http://localhost:3000/api/public/users/sciper/169419', function (err, res, body) {
            assert.ok(res.statusCode===200, 'Request status 200');
            done();
        });
    });
});

describe('API /users', function(){
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
    it('handle errors in query parameters', function (done){
        var options = {
            url: 'http://localhost:3000/api/public/users/sciper/Z18171',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        request.get(options, function (err, res, body) {
            debug(JSON.parse(body));
            debug(res);
            assert(JSON.parse(body).message.indexOf('Sciper not valid!') >= 0);
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

    // Testing searchUserByName
    it('should be able to search user by Name',function(done){
        this.timeout(5000);
        request.get('http://localhost:3000/api/public/users/search/ban', function(err, json, headers) {
            assert.notEqual(json.body.search('Samuel Bancal'), -1, 'Samuel Bancal must be found by searching "ban" keyword');
            done();
        });
    });

    // Testing searchUserByPhone
    it('should be able to search user by Phone',function(done){
        request.get('http://localhost:3000/api/public/users/phone/35455', function(err, json, headers) {
            assert.equal(JSON.parse(json.body)[0].sciper, '169419', 'Checking that sciper is correct to this phone value');
            assert.equal(JSON.parse(json.body)[0].accreds[0].phone, '+41 21 6935455', 'Checking that phone number is present in the first accred');
            done();
        });
    });

    // Testing searchUserByPhone
    it('should be able to search user by UnitAcronym', function (done) {
        request.get('http://localhost:3000/api/public/users/unit/enac-it', function (err, json, headers) {
            assert.notEqual(json.body.search('Nepa'), -1, 'Nepa must be found by searching "enac-it" keyword');
            done();
        });
    });

    // Testing sciper
    it('should not be able to read optional properties data',function(done){
        request.get('http://localhost:3000/api/public/users/sciper/169419', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            debug(JSON.stringify(dataArray[0]));

            assert.equal(dataArray[0].optionalProperties, undefined, 'Checking that optional prop are undef with public access');
            done();
        });
    });
});

describe("API /user", function () {
    it("returns a single object", function() {
        request.get('http://localhost:3000/api/public/user/sciper/169419', function(err, json, headers) {

            var dataArray = JSON.parse(json.body);
            debug(JSON.stringify(dataArray[0]));

            assert.equal(dataArray.status, 'success');
            assert.equal(dataArray.data.displayName, 'Nicolas Borboën', 'Checking displayName value');
            done();
        });
    });
});
