const http = require(`http`);

const server = http.createServer();

server.listen(5000, () => console.log('Server listenting on port 5000'));

// request/response from browser
server.on('request', (request, response) => {
  if (request.url === '/' && request.method === 'GET') {
    response.writeHead(200, {
      'My-custom header': 'This is a great API',
    });
    response.end('Welcome to my server');
    return;
  }
  if (request.url === '/status' && request.method === 'GET') {
    const status = {
      up: true,
      owner: 'Ayana',
      date: Date.now(),
    };
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Another-Header': 'more things',
      'Another-Header': 'more things',
    });
    response.end(JSON.stringify(status));
  }
});
