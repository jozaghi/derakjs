
import request from "./request";


const route = (rawRequest,res) =>{
    request.parse(rawRequest).then(req=>{
        console.log(req);
        res.end(JSON.stringify(req));
    }).catch(ex=>{
        console.log(ex);
        res.end(JSON.stringify(ex));
    });

}

export default {
    route
}