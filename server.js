const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const { Server } = require("socket.io");
app.use(cors({
    origin:"http://127.0.0.1:8080"
}))
const server = app.listen(process.env.PORT | 5555,()=>{
    console.log('Server started on', process.env.PORT)
})
const io = new Server(server,{
    cors:{
        origin: 'http://127.0.0.1:8080'
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('createRoom',()=>{
        socket.broadcast.emit('roomCreated', socket.id)
      })
  });

 




