const app = require('./src/app');

app.get(
    '/user/:id',
    validate={
        id:"req|min(5)"
    },
    ctx=>{
        ctx.ok(ctx.param.id);
    }
);

app.start(3000)
.then(()=>console.log("server is running on port 3000"));