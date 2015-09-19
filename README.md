# About

**epfl-api** is a basic webservice linked with the EPFL ldap, to be able to retrieve the organisational info easily

# To test
- GET http://localhost:3000/api/public/users/sciper/150938
- GET http://localhost:3000/api/public/users/name/nicolas
- GET http://localhost:3000/api/internal/users/name/nicolas (Internal should be replaced with an api key)

# ToDo
- [ ] Cache
- [x] Implement test suite
- [ ] Conventions
    - maybe http://jshint.com/ can do a part of the job
    - http://stackoverflow.com/questions/5495984/coding-style-guide-for-node-js-apps which recommends https://github.com/felixge/node-style-guide
- [ ] Normalize or standardize models to send back
- [ ] Manage cycle of life of api by a version management
- [ ] Manage a subscription to services to allow access only on granted request (by unique GID in the url)
- [ ] Error management
- [ ] Add HTTPS by default

# Notes
It should be used in the intranet and it shouldn't be published outside DIODE

The `[public]` parameter in the url has to be replaced by a personnal GUID managed in `accessValidator.js`