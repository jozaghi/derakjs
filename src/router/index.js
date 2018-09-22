

const routeParser = require("./route-parser");

const routes=[];

const find=(method,path)=>{
    for(let i=0;i<routes.length;i++){
        let route=routes[i];
        if(method!=route.method || method=='ALL')continue;
        var result=routeParser.match(path,route.pattern);
        if(result.isMatch){
            return {
                actions:route.actions,
                parameters:result.parameters
            };
        }
    }
    return null;
}

const set = (method,path,actions) =>{
    var pattern=routeParser.build(path);
    routes.push({
        method,
        pattern,
        actions
    });
}

const run= async (ctx) =>{
    var route=find(ctx.method,ctx.path);
    if(route!=null){
        ctx.params=route.parameters;
        ctx.setActions(route.actions);
        ctx.getCurrentAction().call(null,ctx);
    }else{
        ctx.notFound();
    }
}

const get = (path,...actions)=>{
    set('GET',path,actions);
}
const post = (path,...actions) =>{
    set('POST',path,actions);
}
const put = (path,...actions) =>{
    set('PUT',path,actions);
}
const patch = (path,...actions) =>{
    set('PATCH',path,actions);
}
const del = (path,...actions) =>{
    set('DELETE',path,actions);
}
const all = (path,...actions) =>{
    set('ALL',path,action);
}

module.exports ={
    get,
    post,
    put,
    patch,
    del,
    all,
    run
}