'use strict';
(function (keysManagementController) {
    keysManagementController.init = function (app) {
        var keys = ['f7a4e624-2c83-47c2-8b00-ab0d517e63c6', 'fc2f85cf-85ce-4000-ab2e-92e7b74f3e37', '30d43ffc-e87d-4694-a5ee-6b9c147acb73'];

        // http://localhost:3000/app/keysManagement/list
        app.get('/', app.tequilaStrategy.ensureAuthenticated, function (req, res) {
            res.render('keysManagement/list', { keys: keys});
        });

        app.get('/add', app.tequilaStrategy.ensureAuthenticated, function (req, res) {
            keys.push('f7a4e624-2c83-47c2-8b00-ab0d517e63c6');
            res.render('keysManagement/list', { keys: keys });
        });

        app.get('/delete/:key', app.tequilaStrategy.ensureAuthenticated, function (req, res) {
            keys.pop();
            res.render('keysManagement/list', { keys: keys });
        });
    };
})(module.exports);