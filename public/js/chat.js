const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {

    e.preventDefault()
    const message = e.target.elements.message.value
    //fire..
    socket.emit('sendMessage',message)
})

/* socket.on('countUpdated', (count) => {
    console.log("count has been updated", count)
})

document.querySelector('#increment').addEventListener('click', () => {

    console.log('incremented..')
    socket.emit('increment')
}) */
