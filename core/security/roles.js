'use strict';

module.exports = function(app) {
    var self = {};
    var passeportEnsureAuth = app.middlewares.passportTequila.ensureAuthenticated;
    self.ensureRole = function (expectedRoles) {
        
        return function(req, res, next){
            passeportEnsureAuth(req, res, function() {
                var userRoles = req.user.roles;
                
                for (var expectedRole in expectedRoles) {
                    if (expectedRoles.hasOwnProperty(expectedRole)) {
                        var currentExpectedRole = expectedRoles[expectedRole];
                        if (userRoles.hasOwnProperty(currentExpectedRole) || currentExpectedRole === "authenticated") {
                            next();
                            return 0;
                        }
                    }
                }
                res.sendStatus(403);
            });
        }
    }
    return self;
}