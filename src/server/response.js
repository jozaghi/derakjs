var res;

const ok = data=>{
    res.end(JSON.stringify(data));
}
const notFound = ()=>{
    res.statusCode=404;
    res.end();
}


module.exports=(response) =>{
    res= response;
    return {
        ok,
        notFound
    };
}