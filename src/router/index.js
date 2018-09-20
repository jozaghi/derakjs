

const routeParser = require("./route-parser");

const routes=[];

const find=(method,path)=>{
    for(let i=0;i<routes.length;i++){
        let route=routes[i];
        if(method!=route.method || method!='ALL')continue;
        var result=routeParser.match(path,route.pattern);
        if(result.isMatch){
            return {
                action:route.action,
                parameters:result.parameters
            };
        }
    }
}

const set = (method,path,action) =>{
    var pattern=routeParser.build(path);
    routes.push({
        method,
        pattern,
        action
    });
}

const run= async (req,res) =>{
    var route=find(req.method,req.path);
    if(route!=null){
        req.params=route.parameters;
        route.action(req,res);
    }else{
        res.end('404');
    }
}

const get = (path,action)=>{
    set('GET',path,action);
}
const post = (path,action) =>{
    set('POST',path,action);
}
const put = (path,action) =>{
    set('PUT',path,action);
}
const patch = (path,action) =>{
    set('PATCH',path,action);
}
const del = (path,action) =>{
    set('DELETE',path,action);
}
const all = (path,action) =>{
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