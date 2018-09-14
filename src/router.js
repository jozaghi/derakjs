
import request from "./request";
import { build,match } from "./route-parser.js";

const routes=[];

const find=(path)=>{
    for(let i=0;i<routes.length;i++){
        let route=routes[i];
        var result=match(path,route.pattern);
        if(result.isMatch){
            console.log(result)
            return {
                action:route.action,
                parameters:result.parameters
            };
        }
    }
}

const set = (path,action) =>{
    var pattern=build(path);
    routes.push({
        pattern,
        action
    });
}



const run= async (req,res) =>{
    var route=find(req.path);
    if(route!=null){
        console.log(route)
        req.params=route.parameters;
        route.action(req,res);
    }else{
        res.end('404');
    }
}


export default {
    set,
    run
}