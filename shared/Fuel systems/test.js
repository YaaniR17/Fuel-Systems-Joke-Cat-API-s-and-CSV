const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Test works!');
});

server.listen(80, () => {
    console.log('Sanity check server is running! Waiting for connections...');
});
