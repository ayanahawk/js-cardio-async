const http = require(`http`);
const url = require(`url`);
const db = require('./db');

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
      'Another-Header1S': 'more things',
    });
    response.end(JSON.stringify(status));
  }

  const parsedUrl = url.parse(request.url, true);
  console.log(parsedUrl.query);

  if (parsedUrl.pathname === '/set' && request.method === 'PATCH') {
    return db
      .set(
        parsedUrl.query.file,
        parsedUrl.query.key,
        parsedUrl.query.value,
        parsedUrl.query.key1,
        parsedUrl.query.value1
      )
      .then(() => {
        response.end('Value set');
      })
      .catch(err => {
        // erro handler
      });
  }
});
