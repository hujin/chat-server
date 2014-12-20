var io = require('socket.io').listen(8081,function(){
    console.log("listening at:http://192.168.1.210:8081/");
});

//io.sockets.on('connection',function(socket){
//    console.log("connect succeed");
//    socket.on('message',function(msg){
//        console.log('message received:' + msg);
//        socket.broadcast.emit('message',msg);
//    });
//
//    socket.on('disconnect',function(){
//
//    });
//
//});

io.on('connection',function(socket){
    var room=socket.handshake.query.user;

    socket.join(room);

    socket.on('say to',function(id,msg){
        console.log(msg);
        socket.broadcast.to(id).emit('private message',msg);
    })
    socket.on('private message',function(msg){

    });

    socket.on('disconnect',function(){
       io.sockets.emit('user disconnected');
    });
});