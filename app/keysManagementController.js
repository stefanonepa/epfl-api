'use strict';
(function (keysManagementController) {
    keysManagementController.init = function (app) {
        var keysContext = app.keyContext;

        // http://localhost:3000/app/keysManagement/list
        app.get('/', app.tequilaStrategy.ensureAuthenticated, function (req, res) {
            console.log(req.user.tequila.uniqueid);
            keysContext.keys.getKeysForUser(req, res,function(keys){
                res.render('keysManagement/list', { keys: keys });
            })
        });

        app.get('/add', app.tequilaStrategy.ensureAuthenticated, function (req, res) {
            keysContext.keys.addKeysForUser(req, res,function(keys){
                res.render('keysManagement/list', { keys: keys });
            })
        });

        app.get('/delete/:apiKeyToDelete', app.tequilaStrategy.ensureAuthenticated, function (req, res) {
            req.apiKeyToDelete = req.params.apiKeyToDelete;
            keysContext.keys.deleteKeysForUser(req, res,function(keys){
                res.render('keysManagement/list', { keys: keys });
            })
        });
    };
})(module.exports);