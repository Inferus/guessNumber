import {io} from "socket.io-client"

const ws = io('http://172.20.10.3:5555')
const startBtn = document.querySelector('.startBtn')
const mainSection = document.querySelector('.mainSection')
const container = document.querySelector('.container')
const loader = document.createElement('img')
let clickListener

ws.on('gameStart',(randomNums)=>{
main(randomNums)
})
startBtn.addEventListener('click',()=>{
    searchAnOponent()
})

function searchAnOponent(){
    startBtn.remove()
   loader.src = 'public/assets/Ghost.gif'
   container.append(loader)
   ws.emit('createRoom')

}

function main(randomNums){
   
    if(startBtn){
        startBtn.remove()
    }
loader.remove()
const oldOnes = document.querySelectorAll('.numberBtn')
oldOnes?.forEach(e=>{
    e.remove()
})

randomNums.forEach(e=>{
    const number = document.createElement('button')
    number.classList.add('numberBtn')
    number.innerText = e
    mainSection.append(number)
    number.addEventListener('click',e=>{
        const selectedNum = e.target.innerText
        number.classList.add('selected')
        ws.emit('selected', selectedNum)
const allNodeNumbers = document.querySelectorAll('.numberBtn')
allNodeNumbers.forEach(e=>{
    e.disabled = true
})
        
     })
})
}
ws.on('match', match=>{
const numberNodes = mainSection.querySelectorAll('.numberBtn')
numberNodes.forEach(e=>{
    if (e.innerText === match){
        e.classList.add('match')
    }
})
})
ws.on('nomatch', numArr=>{
    const numberNodes = mainSection.querySelectorAll('.numberBtn')
numberNodes.forEach(e=>{
    numArr.forEach(number=>{
        if (number === e.innerText){
            e.classList.add('wrong')
        }
    })
})
})
