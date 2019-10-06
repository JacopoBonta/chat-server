require('dotenv')({ path: `${__dirname}` })
const http = require('http').createServer();
const io = require('socket.io')(http);
const { SERVER_ADDRESS, SERVER_PORT } = process.env

io.on('connection', function(socket){
  console.log('user connected!', socket)

  socket.on('global', function(msg){
    console.log('message: ' + msg);
    socket.emit(msg)
  });
});

http.listen(SERVER_PORT, SERVER_ADDRESS, function(){
  console.log(`listening on ${SERVER_ADDRESS}:${SERVER_PORT}`);
});