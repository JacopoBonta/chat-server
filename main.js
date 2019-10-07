require('dotenv').config({ path: `${__dirname}/.env` });
const http = require('http').createServer();
const io = require('socket.io')(http);
const { SERVER_ADDRESS, SERVER_PORT } = process.env;

// userMap tiene traccia degli utenti che si connettono. La key è l'id del socket ed il value un nome casuale univoco
const userMap = new Map();

// setUsername for a given socketId sets a username in userMap and returns the old username
function setUsername(socketId, username) {
  const oldUsername = userMap.get(socketId);
  userMap.set(socketId, username);
  return oldUsername;
}

io.on('connection', function(socket) {

  // new client connected
  // register the client with a temporary username
  userMap.set(socket.id, `user#${userMap.size}`);

  // welcome message to global channel
  io.emit('global', {
    username: 'server',
    message: 'New user joined to the server!' + userMap.get(socket.id)
  });

  // listen for messages in commands channel
  socket.on('commands', function(msg) {

    let res = {
      "ok": false,
      "other": ""
    };

    if (typeof msg !== 'object') {
      res.other = "invalid message";
    }
    if (!msg.cmd || typeof msg.cmd !== 'string') {
      res.other = "bad command";
    }
    if (!msg.args || !Array.isArray(msg.args)) {
      res.other = "bad arguments";
    }

    const { cmd, args } = msg;

    // take actions
    switch(cmd) {
      case "changeuser":
        if (args.length !== 1) {
          res.other = "changeuser command accept only one argument";
        }

        const oldusername = setUsername(socket.id, args[0]);
        let msg = `username changed from ${oldusername} to ${args[0]}`;
        io.emit('global', {
          username: "server",
          message: msg
        });
        
        res.ok = true;
        res.other = msg;
        break;
    }

    // respond to user
    socket.emit('commands', res);
  })

  // listen for messages in global channel
  socket.on('global', function(msg) {

    const username = userMap.get(socket.id);
    const message = msg.message;

    console.log('message from: ' + username);
    console.log('message: ' + message + '\n');

    socket.broadcast.emit('global', { username, message });
  });

  // user disconnect from server
  socket.on('disconnect', function(reason) {
    
    const user = userMap.get(socket.id);
    const msg = `User ${user} diconnect for reason ${reason}`;
    
    // annunce user exit
    io.emit('global', {
      username: 'server',
      message: msg
    });

    userMap.delete(socket.id);
  })
});


http.listen(SERVER_PORT, SERVER_ADDRESS, function() {
  console.log(`listening on ${SERVER_ADDRESS}:${SERVER_PORT}`);
});