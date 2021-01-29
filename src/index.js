const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))
const socketio = require('socket.io')
const { Socket } = require('dgram')

const io = socketio(server)
let count =0
io.on('connection', (socket) => {

    console.log('new socket connection....')
    socket.emit('message','Welcome!')

    //io.broadcast.emit('message','new user joined..')
    socket.broadcast.emit('message','new user joined..')

    socket.on('sendMessage',(message,callback)=>{

        io.emit('message',message)
        callback();
    })
    socket.on('disconnect',()=>{
        io.emit('message',"user left...")
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
