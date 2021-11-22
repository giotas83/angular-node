const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

app.set('port', port);

let server = http.createServer(app);

server.listen(port);
