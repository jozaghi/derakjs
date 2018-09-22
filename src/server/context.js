const request = require('./request');
const response = require('./response');



const next = function() {
    if (this.actions.length < this.currentActionIndex + 2) {
      throw "there is no more actions";
    }
    this.actions[++this.currentActionIndex](this);
};

const setActions= function(actions){
    this.actions=actions;
    this.currentActionIndex = 0;
}
const getCurrentAction=function(){
    return this.actions[this.currentActionIndex]
}

module.exports=async function(req, res){

    var requestContext =  await request(req);
    var responseContext = response(res);

    return {
        ...requestContext,
        ...responseContext,
        next,
        setActions,
        getCurrentAction
    };
}