const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))
const socketio = require('socket.io')
const {generateMessage} = require('./util/messages')
const { Socket } = require('dgram')

var uname=""

const io = socketio(server)
let count =0
io.on('connection', (socket) => {

    console.log('new socket connection....')
    socket.on('join',({username,room})=>{

        uname = username
        socket.emit('message',generateMessage('Welcome!'))
        console.log("user joined....",username)
        socket.broadcast.emit('message',generateMessage(`${username} has joined..`))
    })
    

    //io.broadcast.emit('message','new user joined..')
    socket.broadcast.emit('message',generateMessage('new user joined..'))   

    socket.on('sendMessage',(message,callback)=>{

        io.emit('message',generateMessage(message))
        callback();
    })
    socket.on('disconnect',()=>{

        io.emit('message',generateMessage(`${uname}has left`))
        //socket.broadcast.emit('message',generateMessage(`${username} has joined..`))
    })
    socket.on('sendLocation',(cords)=>{

        io.emit('message',`https://google.com/maps?q=${cords.latitude},${cords.longitude}`)
    })

    /* socket.emit('countUpdated',count)

    socket.on('increment',()=>{
        count++
        //socket.emit('countUpdated',count)
        io.emit('countUpdated',count)
    }) */

})

server.listen(3000, () => {
    console.log('server started !!..')
})
