"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(_router2.default.route);

var start = async function start() {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
    return new Promise(function (resolve, reject) {
        try {
            server.listen(port, function () {
                resolve();
            });
        } catch (ex) {
            reject(ex);
        }
    });
};

exports.default = {
    start: start
};