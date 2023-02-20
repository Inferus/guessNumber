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
        origin: '*'
    }
});

let rooms = new Set()
let match = null
io.on('connection', (socket) => {
    socket.on('disconnect', ()=>{
        rooms.delete(socket.id)
    })
    socket.on('createRoom',()=>{
      
        if(rooms.size){
            socket.join([...rooms][0])
        io.to([...rooms][0]).emit('gameStart', genRandomNumbers())
        }else{
            rooms.add(socket.id)
        }
      })
      socket.on('selected', selected=>{
   selecting(selected)
        
      })
      
  });
function selecting(selected){
    if (!match){
     match = selected
     return
    }
    if(selected === match){
        io.to([...rooms][0]).emit('match', match)
        setTimeout(()=>{
    io.to([...rooms][0]).emit('gameStart', genRandomNumbers())
        },3000)
    match = null

    }else{
        io.to([...rooms][0]).emit('nomatch', [selected,match])
        setTimeout(()=>{
            io.to([...rooms][0]).emit('gameStart', genRandomNumbers())
                },3000)
    match = null

    }
}

 




  function genRandomNumbers(){
    const randomArr = []
    for(let i=0;i<9;i++){
        const randomNumber = Math.round(Math.random()*100)
        if (randomArr.includes(randomNumber)){
            --i 
            continue
        }
        randomArr.push(randomNumber)

    }
    return randomArr
}