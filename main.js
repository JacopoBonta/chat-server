require('dotenv').config({ path: `${__dirname}/.env` })
const http = require('http').createServer();
const io = require('socket.io')(http);
const { SERVER_ADDRESS, SERVER_PORT } = process.env

// userMap tiene traccia degli utenti che si connettono. La key è l'id del socket ed il value un nome casuale univoco
const userMap = new Map()

io.on('connection', function(socket) {

  // new client connected
  // register the client with a temporary username
  userMap.set(socket.id, `user#${userMap.size}`)

  // welcome message to global channel
  io.emit('global', {
    username: 'server',
    message: 'New user joined to the server!' + userMap.get(socket.id)
  })

  // listen for messages in global channel
  socket.on('global', function(msg) {

    const username = userMap.get(socket.id)
    const message = msg.message

    console.log('message from: ' + username);
    console.log('message: ' + message + '\n');

    socket.broadcast.emit('global', { username, message });
  });

  // user disconnect from server
  socket.on('disconnect', function(reason) {
    
    const user = userMap.get(socket.id)
    const msg = `User ${user} diconnect for reason ${reason}`
    
    // annunce user exit
    io.emit('global', {
      username: 'server',
      message: msg
    })

    userMap.delete(socket.id)
  })
});


http.listen(SERVER_PORT, SERVER_ADDRESS, function() {
  console.log(`listening on ${SERVER_ADDRESS}:${SERVER_PORT}`);
});