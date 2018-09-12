"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var route = function route(rawRequest, res) {
    _request2.default.parse(rawRequest).then(function (req) {
        console.log(req);
        res.end(JSON.stringify(req));
    }).catch(function (ex) {
        console.log(ex);
        res.end(JSON.stringify(ex));
    });
};

exports.default = {
    route: route
};