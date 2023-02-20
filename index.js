import {io} from "socket.io-client"

const ws = io('http://localhost:5555')
const startBtn = document.querySelector('.startBtn')
const mainSection = document.querySelector('.mainSection')
const rooms = document.querySelector('.rooms')

ws.on('roomCreated',(e)=>{
    console.log(e)
    const room = document.createElement('button')
    room.innerText = e
    rooms.append(room)
})
startBtn.addEventListener('click',()=>{
    main()
})

function main(){
    startBtn.remove()
   const loader = document.createElement('img')
   loader.src = 'public/assets/Ghost.gif'
   mainSection.append(loader)
   ws.emit('createRoom')

}
