define({ "api": [
  {
    "type": "get",
    "url": "/public/user/name/:name",
    "title": "Request User information by NAME",
    "name": "GetUserByName",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "Epfl",
            "description": "<p>informations of Users.</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The name of the User was not found.</p> "
          }
        ]
      }
    },
    "filename": "api/usersController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/public/user/sciper/:sciper",
    "title": "Request User information by SCIPER",
    "name": "GetUserBySciper",
    "group": "User",
    "version": "0.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Sciper</p> ",
            "optional": false,
            "field": "sciper",
            "description": "<p>Users unique EPFL-Sciper.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "Epfl",
            "description": "<p>informations of the User.</p> "
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The sciper of the User was not found.</p> "
          }
        ]
      }
    },
    "filename": "api/usersController.js",
    "groupTitle": "User"
  }
] });