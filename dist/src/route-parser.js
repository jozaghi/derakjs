"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var extractRegex = function extractRegex(param) {
    if (!/^:\w+\(.+\)\/?$/.test(param)) return null;
    return param.replace(/^:\w+\(/gi, "").replace(/\)\/?$/, "");
};
var getParametersName = function getParametersName(param) {
    return param.replace(/^:/, "").replace(/\(.+$/, "");
};
var getParameters = function getParameters(path) {
    var regex = /(?::(\w+(\([^\/]+\))?))/gm;
    var match = null;
    var paramiters = [];
    while ((match = regex.exec(path)) !== null) {
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        var pattern = extractRegex(match[0]);
        if (match.length > 0) paramiters.push({
            name: getParametersName(match[0]),
            path: match[0],
            hasPattern: pattern != null,
            pattern: pattern
        });
    }
    return paramiters;
};
var build = exports.build = function build(path) {
    var parameters = getParameters(path);
    var parameterList = [];
    console.log(parameters);
    parameters.map(function (param, index) {
        if (param.hasPattern) {
            path = path.replace(param.path, "(?:(" + param.pattern + "))");
        } else {
            path = path.replace(param.path, "(?:([^/]+))");
        }
        parameterList.push(param.name);
    });
    path = "^" + path + "/?$";
    return { pattern: path, parameterList: parameterList };
};
var match = exports.match = function match(route, routePattern) {
    var regex = new RegExp(routePattern.pattern, "i");
    var match = null;
    var parameters = {};
    var isMatch = false;
    if ((match = regex.exec(route)) !== null) {
        isMatch = true;
        routePattern.parameterList.map(function (item, index) {
            parameters[item] = match[index + 1];
        });
    }
    return {
        parameters: parameters,
        isMatch: isMatch
    };
};