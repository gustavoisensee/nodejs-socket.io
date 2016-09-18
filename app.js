const path       = require('path');
const express    = require('express');
const app        = express();
const http       = require('http').Server(app);
const io         = require('socket.io')(http);

const bodyParser = require('body-parser');
const fs         = require('fs');
const port       = (process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '/public')));

// Set patterns to the bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Define routers
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Define functions of socket.io
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('send-message', (msg) => {
    io.emit('send-message', msg);
  });

});

// Start the server
http.listen(port);