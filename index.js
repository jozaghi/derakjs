const app = require('./src/app');

app.get(
    '/user/:id',
    // validate= v=>({
    //     id:v.req().min(3)        
    // }),
    ctx=>{
        ctx.ok(ctx.params.id);
    }
);

app.start(3000)
.then(()=>console.log("server is running on port 3000"));