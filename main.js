require('dotenv').config({ path: `${__dirname}/.env` })
const http = require('http').createServer();
const io = require('socket.io')(http);
const { SERVER_ADDRESS, SERVER_PORT } = process.env

io.on('connection', function(socket) {

  socket.broadcast.emit('Welcome new user')

  socket.on('global', function(msg) {
    console.log('message from: ' + msg.username);
    console.log('message: ' + msg.message + '\n');
    socket.broadcast.emit('global', msg);
  });
});

http.listen(SERVER_PORT, SERVER_ADDRESS, function(){
  console.log(`listening on ${SERVER_ADDRESS}:${SERVER_PORT}`);
});