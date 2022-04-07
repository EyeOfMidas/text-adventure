#!/usr/bin/env node
// Dependencies

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process')

// Base Directory - Assuming minimal-http-server 
// will be accessed  from its own folder.
const baseDir = path.join(__dirname, '.');
// Create a server

const httpServer = http.createServer((request, response) => {

  const parsedUrl = url.parse(request.url, true);
  let pathName = parsedUrl.pathname;

  if (pathName == "/") {
    pathName = "/index.html"
  }

  // Get the contentType based on the file extension
  const responseContentType = getContentType(pathName);
  // Set the 'Content-Type' in response header
  response.setHeader('Content-Type', responseContentType);
  fs.readFile(`${baseDir}${pathName}`, (error, data) => {
    if (!error) {
      response.writeHead(200);
      response.end(data);
    } else {
      console.log(error);
      response.writeHead(404);
      response.end('404 - File Not Found');
    }
  });
});
// Mime Types
const mimeTypes = {
  '.html': 'text/html',
  '.jpg': 'image/jpeg',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};
// Get the content type for a given path
const getContentType = pathName => {
  // Set the default content type
  let contentType = 'application/octet-stream';
  // Set the contentType based on mime type
  for (var key in mimeTypes) {
    if (mimeTypes.hasOwnProperty(key)) {
      if (pathName.indexOf(key) > -1) {
        contentType = mimeTypes[key];
      }
    }
  }
  return contentType;
};

let port = 3000
let host = '127.0.0.1'

httpServer.listen(port, () => {
  console.log(`\x1b[32m%s\x1b[0m`, `Server is running at http://${host}:${port}`);
  var url = `http://${host}:${port}`;
  var start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  var child = childProcess.exec(`${start} ${url}`);
  // child.on('exit', function() {
  //     httpServer.close()
  // })
});




