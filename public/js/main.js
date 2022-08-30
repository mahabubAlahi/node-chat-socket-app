const chatForm = document.getElementById('chat-form')
const chatMesssages = document.querySelector('.chat-messages');

const socket = io()

// message from server
socket.on('message', message => {
    outPutMessage(message);

    // Scroll Down
    chatMesssages.scrollTop = chatMesssages.scrollHeight;
})

// Message Submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Message Text
    const msg = e.target.elements.msg.value;

    // Emitting message to server
    socket.emit('chatMessage', msg);
})


function outPutMessage(msg){
    const div = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `<p class="meta">Mahabub <span>8:00pm</span></p>
    <p class="text">
        ${msg}.
    </p>`

    document.querySelector('.chat-messages').appendChild(div);
}