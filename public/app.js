const socket = io()

const nameUser = prompt()

const h4 = document.createElement('h4');
h4.innerText = "You joined";
div.appendChild(h4);

socket.emit('user-joined', nameUser)

socket.on('new-user-joined', data => {
  const h4 = document.createElement('h4');
  h4.innerText = `${data} joined`;
  div.appendChild(h4);
})

btn.addEventListener('click', () => {
  const h4 = document.createElement('h4');
  h4.innerText = `You: ${input.value}`;
  div.appendChild(h4);

  socket.emit('new-message', {nameUser, message: input.value})

  input.value = null
})

socket.on('new-user-message', msg => {
  const h4 = document.createElement('h4');
  h4.innerText = `${msg.nameUser}: ${msg.message}`;
  div.appendChild(h4);
})

input.addEventListener('keyup', e => {
  socket.emit('user-typing', nameUser)
})

const h4_typing = document.createElement('h4');

socket.on('typing', name => {
  h4_typing.innerText = `${name} typing...`
  div.appendChild(h4_typing)

  setTimeout(() => {
    h4_typing.remove()
  },2000)
})