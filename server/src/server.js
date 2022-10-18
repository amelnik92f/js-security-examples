const http = require('http');
const { controller } = require('./controller');

const requestListener = (query) => (req, res) => {
  try {
    controller(req, res, query);
  } catch (error) {
    res.writeHead(500);
    res.end(`Internal Server Error: ${error}`)
  }

}

const createServer = (query) => {
  return http.createServer(requestListener(query));
}

module.exports = { createServer };