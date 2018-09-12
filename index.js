
import  server  from "./src/server";


server.start(4000).then(result=>{
    console.log("server listen on port 4000");
}).catch(error=>{
    console.log(error);
});

