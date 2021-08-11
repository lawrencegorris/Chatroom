const e = require('express');
const express = require('express');
const http = require('http');
const { prototype } = require('stream');

const app = express();
const clientPath = `${__dirname}/../client`;
app.use (express.static(clientPath));
const server = http.createServer(app);

server.listen(8080, () => {
    console.log('server running on port: 8080');
});