const url = require('url');
// const db = require('./db');

const {
  notFound,
  getHome,
  getFile,
  getStatus,
  patchHome,
  postWrite,
  removeKey
} = require('./controller');

exports.handleRoutes = function(request, response) {
  const { pathname, query } = url.parse(request.url, true);

  if (request.url === '/' && request.method === 'GET') {
    return getHome(request, response);
  }
  if (request.url === '/status' && request.method === 'GET') {
    return getStatus(request, response);
  }
  // const parsedUrl = url.parse(request.url, true);
  if (pathname === '/set' && request.method === 'PATCH') {
    console.log(query);
    return patchHome(request, response, query);
  }

  if (pathname.startsWith('/write') && request.method === 'POST') {
    return postWrite(request, response, pathname);
  }

  if (pathname.startsWith('/file') && request.method === 'GET') {
    // why do i need to pass the querey and pathname and not file and key? 
    return getFile(request, response, pathname, query);
  }

  if (pathname === '/remove' && request.method === 'DELETE') {
    return removeKey(request, response, query);
  }

  notFound(request, response);
};
