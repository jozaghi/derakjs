'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _string_decoder = require('string_decoder');

var _punycode = require('punycode');

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = {};

var parseUrl = function parseUrl(rawRequest) {
    var parsedUrl = _url2.default.parse(rawRequest.url, true);

    request.host = parsedUrl.host;
    request.query = parsedUrl.query;
    request.pathname = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    request.path = parsedUrl.path;
};

var parseMethodName = function parseMethodName(rawRequest) {
    request.method = rawRequest.method.toUpperCase();
};

var parseHeaders = function parseHeaders(rawRequest) {
    request.headers = rawRequest.headers;
};

var parseBody = async function parseBody(rawRequest) {
    return new Promise(function (resolve, rejects) {
        var decoder = new _string_decoder.StringDecoder('utf-8');
        var buffer = '';
        rawRequest.on('data', function (data) {
            buffer += decoder.write(data);
            console.log('data');
        });
        rawRequest.on('end', function () {
            buffer += decoder.end();
            resolve(buffer);
        });
    });
};

var parse = async function parse(rawRequest) {

    parseUrl(rawRequest);
    parseMethodName(rawRequest);
    parseHeaders(rawRequest);
    console.log("here");
    request.body = await parseBody(rawRequest);
    return request;
};

exports.default = {
    parse: parse
};