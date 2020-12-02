var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var num_of_players = 0;
var nameList = [];
var default_room=0;

io.on("connection", socket => {
    console.log("a new connection");
    socket.join(default_room);
    num_of_players++;
    socket.on("name", (name)=>{
        nameList.push(name);
        if(num_of_players==2)
        {
            console.log(name);
            socket.to(default_room).emit("name", name);
            //console.log(nameList[0]);
            //socket.emit("name", nameList[0]);
        }
    })
    socket.on("move", (board, score) => {
        if (num_of_players == 2)
            socket.to(default_room).emit("update", board, score);
    })
});

io.on("disconnection", socket => {
    socket.leave(default_room);
})

http.listen(3003, () => {
    console.log('listening on *:3003');
});