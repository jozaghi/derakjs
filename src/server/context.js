const request = require('./request');
const response = require('./response');

module.exports =async (req, res) => {

    var requestContext =  await request(req);
    var responseContext = response(res);

    return {
        ...requestContext,
        ...responseContext
    }
}


