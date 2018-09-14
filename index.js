
import  server  from "./src/server";
import router from "./src/router";



router.set('/user',(req,res)=>{
    res.end("/user");
});

router.set('/user/:id',(req,res)=>{
    res.end(JSON.stringify(req));
});
router.set('/user/:id',(req,res)=>{
    res.end(JSON.stringify(req));
});

router.set('/user/:id/for/:name',(req,res)=>{
    res.end(JSON.stringify(req));
});




server.start(4000).then(result=>{
    console.log("server listen on port 4000");
}).catch(error=>{
    console.log(error);
});

