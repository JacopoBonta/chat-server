require('dotenv')({ path: `${__dirname}` })
const http = require('http').createServer();
const io = require('socket.io')(http);
const { SERVER_ADDRESS, SERVER_PORT } = process.env

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});