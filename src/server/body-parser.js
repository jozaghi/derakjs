const StringDecoder = require("string_decoder").StringDecoder;
const error = require("../util/errors");



const textParser = (data)=>{
    return {
        text:data
    }
}
const jsonParser = (data)=>{
    try{
        return JSON.parse(data);
    }catch{
        error.REQUEST_HAS_INVALID_JSON_BODY();
    }
}
const formParser=(data)=>{

}

const suportedContentTypes={
    'text/plain':textParser,
    'application/json':jsonParser,
    //'application/x-www-form-urlencoded':formParser
}

const getContentTypeParser =(req)=>{
    var contentType=req.headers["content-type"];
    if(contentType==undefined || contentType== null || contentType=="")return{};
    let parser=suportedContentTypes[contentType.toLowerCase()];
    if(!parser){
        error.REQUEST_CONTENT_TYPE_IS_NOT_SUPPORTED();
    }
    return parser;
}




const  parse = async req=> new Promise((resolve,rejects)=>{
    let decoder= new StringDecoder('utf-8');
    let buffer = '';
    req.on('data',data=>{
        buffer += decoder.write(data);
    });
    req.on('end',()=>{
        buffer+=decoder.end();
        try{
            let body=getContentTypeParser(req)(buffer);
            resolve(body);
        }catch(ex){
            rejects(ex);
        }
        
    });
});
   


module.exports= {
    parse
};