import http from "http";
import router from "./router";

const server = http.createServer(router.route);

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