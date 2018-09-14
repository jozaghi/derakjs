"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require("./request");

var _request2 = _interopRequireDefault(_request);

var _routeParser = require("./route-parser.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = [];

var find = function find(path) {
    for (var i = 0; i < routes.length; i++) {
        var route = routes[i];
        var result = (0, _routeParser.match)(path, route.pattern);
        if (result.isMatch) {
            console.log(result);
            return {
                action: route.action,
                parameters: result.parameters
            };
        }
    }
};

var set = function set(path, action) {
    var pattern = (0, _routeParser.build)(path);
    routes.push({
        pattern: pattern,
        action: action
    });
};

var run = async function run(req, res) {
    var route = find(req.path);
    if (route != null) {
        console.log(route);
        req.params = route.parameters;
        route.action(req, res);
    } else {
        res.end('404');
    }
};

exports.default = {
    set: set,
    run: run
};