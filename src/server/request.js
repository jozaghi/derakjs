const url =  require("url");
const StringDecoder = require("string_decoder").StringDecoder;

const context = {};

const parseUrl= req=>{
    let parsedUrl = url.parse(req.url,true);

    context.host = parsedUrl.host;
    context.query = parsedUrl.query;
    context.pathname = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    context.path = parsedUrl.path;
}

const parseMethodName = req=>{
    context.method = req.method.toUpperCase();
}

const parseHeaders = req=>{
    context.headers = req.headers;
}

const  parseBody = async req=> new Promise((resolve,rejects)=>{
    let decoder= new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',data=>{
        buffer += decoder.write(data);
    });
    req.on('end',()=>{
        buffer+=decoder.end();
        resolve(buffer);
    });
});
   
module.exports= async (req)=>{

    parseUrl(req);
    parseMethodName(req);
    parseHeaders(req);
    
    context.body=await parseBody(req);
    return context;
}
