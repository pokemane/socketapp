var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.broadcast.emit('chat message', 'user connected');

  socket.on('disconnect', function(){
    socket.broadcast.emit('chat message', 'user disconnected');
  });

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg.from + ': '+ msg.content);
    console.log(msg.from + ': '+ msg.content);
  });

  socket.on('i am', function(msg){
    socket.broadcast.emit('chat message', msg + ' has joined');
    console.log(msg + ' has joined');
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
