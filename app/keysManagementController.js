'use strict';
(function (keysManagementController) {
    keysManagementController.init = function (app) {
        var keysContext = app.keyContext;

        // http://localhost:3000/app/keysManagement/list
        app.get('/', app.middlewares.roles.ensureRole(["admin", "respinfo"]), function (req, res) {
            keysContext.keys.getKeysForUser(req, res, function(keys) {
                res.render('keysManagement/list', { keys: keys });
            });
        });

        app.get('/add', app.middlewares.roles.ensureRole(["admin", "respinfo"]), function (req, res) {
            keysContext.keys.addKeysForUser(req, res, function (keys) {
                res.redirect('./');
            });
        });

        app.get('/delete/:apiKeyToDelete', app.middlewares.roles.ensureRole(["admin", "respinfo"]), function (req, res) {
            req.apiKeyToDelete = req.params.apiKeyToDelete;
            keysContext.keys.deleteKeysForUser(req, res, function (keys) {
                res.redirect('../');
            });
        });
    };
})(module.exports);