
const router = require('./router');
const server = require('./server')(router);


var app = { 
    ...router,
    ...server
};


module.exports = app;
