const http = require("http");
const context=require("./context")
var router = {};



const server = http.createServer(
    (req,res)=>context(req,res).then(ctx=>router.run(ctx))
);

const start = async (port=3000)=>  new Promise((resolve,reject)=>{
    try{
        server.listen(port,()=>{
            resolve();
        });
    }catch(ex){
        reject(ex);
    }
});



module.exports  = (appRouter)=>{
    router=appRouter;
    return {
        start
    }
}
