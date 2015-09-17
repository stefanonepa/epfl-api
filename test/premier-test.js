var chai = require('chai'),
    assert = chai.assert,
    should = chai.should,
    request = require('request'),
    expect = require('chai').expect;


describe('Get user by sciper', function () {
    it('return userdata in json', function (done) {
        request.get('http://localhost:3000/api/public/users/sciper/169419', function (err, res, body) {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});
