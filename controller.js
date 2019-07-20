const fs = require('fs').promises;
const url = require('url');
const db = require('./db');

exports.notFound = async (request, response) => {
  const html = await fs.readFile('404.html');

  response.writeHead(404, {
    'Content-Type': 'application/json',
  });
  response.end(html);
};

exports.getHome = function(request, response) {
  response.writeHead(200, {
    'My-custom-hearer': 'This is a great app',
    'Another-Header': 'Lit?',
  });
  response.end('Welcome to my server');
};

exports.getStatus = function(request, response) {
  const status = {
    up: true,
    owner: 'Ayana',
    date: Date.now(),
  };
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Another-Header': 'more things',
  });
  response.end(JSON.stringify(status));
};

//
exports.patchHome = (request, response, { file, key, value }) => {
  if (!file || !key || !value) {
    response.writeHead(400);
    return response.end();
  }
  return db
    .set(file, key, value)
    .then(() => {
      response.writeHead(200);
      response.end('Value set');
    })
    .catch(err => {
      response.writeHead(400);
      response.end();
      // error handler
    });
};

exports.postWrite = async (request, response, pathname) => {
  const data = [];
  // event emitted when request reciecevs a chunk of the data
  request.on('data', chunk => {
    data.push(chunk);
  });
  // event emmitteed when recieved all the data
  await request.on('end', async () => {
    // parse data array
    try {
      const body = JSON.parse(data);
      // splitting URL

      await db.createFile(pathname.split('/')[2], body);

      console.log(body);
      console.log(pathname);
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      return response.end('File written');
    } catch (err) {
      response.writeHead(400, {
        'Content-type': 'text/json',
      });
      response.end(err.message);
    }
  });
};

/*
 * Retreives new file or value of specific key
 * Returns eror if fie does not exist or invalid key
 @param {object} request 
 @param {object} repsonse 
 @param {string} pathname   a string that follows the initial slash 
 @param {string} [key] name of the key from querey
 */

exports.getFile = async (request, response, pathname, { key }) => {
  try {
    const file = pathname.split('/')[2];
    if (!file) {
      throw Error('Please provide a filename');
    }

    // get key if it was passed as query params
    if (key) {
      const value = await db.get(file, key);
      response.writeHead(200, {
        'Content-Type': 'text/html',
      });
      return response.end(value);
    }

    // else get the whole file
    const contents = await db.getFile(file);
    response.writeHead(200, {
      'Content-Type': 'application/json',
    });
    response.end(contents);
  } catch (err) {
    response.writeHead(404, {
      'Content-Type': 'text/html',
    });
    response.end(err.message);
  }
};
