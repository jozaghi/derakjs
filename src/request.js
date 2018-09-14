import url from 'url';
import { StringDecoder } from "string_decoder";

const request = {};


const parseUrl= rawRequest=>{
    let parsedUrl = url.parse(rawRequest.url,true);

    request.host = parsedUrl.host;
    request.query = parsedUrl.query;
    request.pathname = parsedUrl.pathname.replace(/^\/+|\/+$/g,'');
    request.path = parsedUrl.path;
}

const parseMethodName = rawRequest=>{
    request.method = rawRequest.method.toUpperCase();
}

const parseHeaders = rawRequest=>{
    request.headers = rawRequest.headers;
}

const  parseBody = async rawRequest=> new Promise((resolve,rejects)=>{
    let decoder= new StringDecoder('utf-8');
    let buffer = '';
    rawRequest.on('data',data=>{
        buffer += decoder.write(data);
    });
    rawRequest.on('end',()=>{
        buffer+=decoder.end();
        resolve(buffer);
    });
});
   
const parse = async (rawRequest)=>{

    parseUrl(rawRequest);
    parseMethodName(rawRequest);
    parseHeaders(rawRequest);
    request.body=await parseBody(rawRequest);
    return request;
}


export default {
    parse
}; 