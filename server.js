const http = require(`http`);
const url = require(`url`);
const { handleRoutes } = require('./router');

const server = http.createServer();

server.listen(5000, () => console.log('Server listenting on port 5000'));

// request/response from browser
// event handler
server.on('request', handleRoutes);
