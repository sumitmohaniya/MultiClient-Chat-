const socket= io('http://localhost:8000');
const form=document.getElementById("send-message");
const messageIn=document.getElementById("messageInput");
const messageContainer =document.querySelector(".container");

var audio =new Audio('message_received.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageIn.value;
    append(`you: ${message}`,'right');
    socket.emit('send',message);
    messageIn.value=' ';
})
const name=prompt("Enter your name");
socket.emit('new-user-joined',name);
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})
socket.on('left',name =>{
    append(`${name} left chat`,'left');
})
