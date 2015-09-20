# About

**epfl-api** is a basic webservice linked with the EPFL services (mainly ldap), to be able to retrieve the organisational info easily.

# API
* Users
* Units

# To test

## Users
- GET http://localhost:3000/api/public/users/sciper/150938
- GET http://localhost:3000/api/public/users/name/nicolas
- GET http://localhost:3000/api/public/users/search/nico
- GET http://localhost:3000/api/internal/users/name/nicolas (Internal should be replaced with an api key)

## Units
- GET http://localhost:3000/api/public/units/name/sti-it
- GET http://localhost:3000/api/public/units/search/sti

# ToDo
- [ ] Cache
- [x] Implement test suite
    - Done thanks to [mocha](https://github.com/mochajs/mocha/wiki)
- [ ] Conventions
    - maybe http://jshint.com/ can do a part of the job
    - https://github.com/felixge/node-style-guide
    - https://github.com/airbnb/javascript
    - https://github.com/rwaldron/idiomatic.js
    - http://google.github.io/styleguide/javascriptguide.xml
- [ ] Normalize or standardize models to send back
- [ ] Manage cycle of life of api by a version management
- [ ] Manage a subscription to services to allow access only on granted request (by unique GID in the url)
- [ ] Error management
- [ ] Add HTTPS by default
- [ ] Extend API to more services (i.e. inventory numbers, epnet, ...)

# Notes
It should be used in the intranet and it shouldn't be published outside DIODE

The `[public]` parameter in the url has to be replaced by a personal GUID managed in `accessValidator.js`