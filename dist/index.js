"use strict";

var _server = require("./src/server");

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_server2.default.start(4000).then(function (result) {
    console.log("server listen on port 4000");
}).catch(function (error) {
    console.log(error);
});