import http from "http";
import router from "./router";
import request from "./request";
import response from "./response";

const server = http.createServer((req,res)=>{
    request.parse(req).then(parsedRequest=>
    router.run( parsedRequest,response.parse(res))
    )
});

const start = async (port=3000)=>  new Promise((resolve,reject)=>{
    try{
        server.listen(port,()=>{
            resolve();
        });
    }catch(ex){
        reject(ex);
    }
});

export default {
    start
}