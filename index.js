const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 4500 || process.env.PORT;
const server = http.createServer(app);
const users = [{}];
app.use(cors());
app.get('/',(req,res)=>{
res.send("hell is working");
})

const io = socketIO(server);

io.on("connection",(socket)=>{
    console.log("new connections....");

    socket.on('joined',({user})=>{
        console.log(socket.id)
        users[socket.id]=user;
        console.log(users[socket.id]);
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has joined`})
        socket.emit('welcome' , {user:"Admin",message:`welcome to the chat.. ${users[socket.id]}`})

    })
    socket.on('message',({message,id})=>{
        console.log(message,id)
      io.emit('sendMessage',{user:`${users[id]}`,message,id})
    })
    socket.on('disconnects',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:"user has left"})
        console.log("used disconnectd..");
    })
    })



server.listen(port , ()=>{
    console.log("server is running.......");

})