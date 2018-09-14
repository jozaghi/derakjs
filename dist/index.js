"use strict";

var _server = require("./src/server");

var _server2 = _interopRequireDefault(_server);

var _router = require("./src/router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_router2.default.set('/user', function (req, res) {
    res.end("/user");
});

_router2.default.set('/user/:id', function (req, res) {
    res.end(JSON.stringify(req));
});
_router2.default.set('/user/:id', function (req, res) {
    res.end(JSON.stringify(req));
});

_router2.default.set('/user/:id/for/:name', function (req, res) {
    res.end(JSON.stringify(req));
});

_server2.default.start(4000).then(function (result) {
    console.log("server listen on port 4000");
}).catch(function (error) {
    console.log(error);
});