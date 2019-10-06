require('dotenv').config({ path: `${__dirname}/.env` })
const http = require('http').createServer();
const io = require('socket.io')(http);
const { SERVER_ADDRESS, SERVER_PORT } = process.env

io.on('connection', function(socket){

  socket.on('global', function(msg) {
    console.log('message: ' + msg);
    socket.emit('global', msg)
  });
});

http.listen(SERVER_PORT, SERVER_ADDRESS, function(){
  console.log(`listening on ${SERVER_ADDRESS}:${SERVER_PORT}`);
});