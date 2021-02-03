const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = document.querySelector('input')
const $messafeFormButton = document.querySelector('button')
const $messages = document.querySelector('#messages')
const messageTemplate = document.querySelector('#message-template').innerHTML
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

socket.on('message', (message) => {

    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm:ss:a')
    })
    $messages.insertAdjacentHTML('afterbegin', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {

    e.preventDefault()
    //disable
    $messafeFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value
    //fire..
    socket.emit('sendMessage', message, () => {
        //enable
        $messafeFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        console.log("message deliverd...")
    })

})

document.querySelector('#send-location').addEventListener('click', () => {

    if (!navigator.geolocation) {

        return alert('your browser does not support location...')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        //fire
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
        })
    })
})

socket.emit('join',{username,room})
