const url =  require("url");
const bodyParser = require("./body-parser");

const context = {};

const parseUrl= req=>{
    let parsedUrl = url.parse(req.url,true);

    context.host = parsedUrl.host;
    context.params = parsedUrl.query;
    context.pathname = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    context.path = parsedUrl.path;
}

const parseMethodName = req=>{
    context.method = req.method.toUpperCase();
}

const parseHeaders = req=>{
    context.headers = req.headers;
}

module.exports= async (req)=>{

    parseUrl(req);
    parseMethodName(req);
    parseHeaders(req);
    
    context.params={
        ...context.params,
        ...await bodyParser.parse(req),
    }
    return context;
}
