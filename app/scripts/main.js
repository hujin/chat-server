//var fs = require('fs'),
//    http = require('http'),
//    socketio = require('socket.io');
//
//var server = http.createServer();
//var sio = socketio.listen(server);
//
//server.listen(3010);
//
//sio.set('log level',1);
//
//sio.sockets.on('connection',function(socket){
//    socket.on('message',function(data){
//
//        socket.broadcast.emit('message',data);
//    });
//});