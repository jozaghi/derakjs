const app = require('./src/app');

app.get(
    '/user/:id',
    // validate= v=>({
    //     id:v.req().min(3)        
    // }),
    ctx=>{
        ctx.s="-1"
        ctx.next();
    },
    ctx=>{
        ctx.s+="-2"
        ctx.next();
    },
    ctx=>{
        ctx.s+="-3"
        ctx.ok(ctx.s);
    },
);

app.start(3000)
.then(()=>console.log("server is running on port 3000"));