const { debug } = require('console');
const http = require('http');
const app = require('./backend/app');

/* const port = process.env.PORT || 3000;

app.set('port', port);

let server = http.createServer(app);

server.listen(port); */


const normalizePort = (val) => {
  var port = parseInt(val, 10);
  if(isNaN(port)) {
    return val; // named pipe
  }
  if(port >= 0) {
    return port;// port number
  }
  return false;
}

const onError = (error) => {
  if(error.syscall !== 'listen'){
    throw error;
  }
  const bind = typeof port === 'string' ? 'pipe ' + port : 'port ' + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + ' require elevated privileges');
      process.exit(1);
    break;
    case "EADDRINUSE":
      console.error(bind + ' is already in use');
      process.exit(1);
    break;
    default:
      throw error;
  }
}

const onListening = () => {
  // const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);



