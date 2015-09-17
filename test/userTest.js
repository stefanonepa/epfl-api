var assert = require('assert');
var request = require('request');

describe('Get user by sciper', function () {
    it('return userdata in json', function () {
        request.get('http://localhost:3000/api/public/users/sciper/169419', function (err, res, body) {
            assert.ok(res.statusCode===200, "Request status 200");
        });
    });
});

