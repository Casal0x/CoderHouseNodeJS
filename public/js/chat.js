const socket = io.connect('http://localhost:8080', { forceNew: true });

let email = '';
const loginForm = document.getElementById('login-form');
const chatForm = document.getElementById('chat-input');
const emailInput = document.getElementById('chat-email');
const messageInput = document.getElementById('chat-message');
const chatBox = document.getElementById('chat-box');
const disconnectBtn = document.getElementById('disconnect-btn');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  email = emailInput.value.trim();
  loginForm.classList.add('d-none');
  chat.classList.remove('d-none');
  disconnectBtn.classList.remove('d-none');
  socket.emit('joinRoom', {
    email,
    room: 'default',
  });
  emailInput.value = '';
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();

  socket.emit('chatMessage', message);
  messageInput.value = '';
});

disconnectBtn.addEventListener('click', (e) => {
  disconnectBtn.classList.add('d-none');
  chat.classList.add('d-none');
  loginForm.classList.remove('d-none');
  socket.emit('disconnect-web');
});

socket.on('message', (data) => {
  addMessage(data);
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on('initChat', (data) => {
  if (data.length) {
    data.forEach((item) => {
      addMessage(item);
    });
  }
});

function addMessage(data) {
  const message = `
    <div class="chat-message mb-2 ${data.bot ? 'bot-message' : ''}">
      <div class="row chat-userdata">
          <div class="chat-message__email col-6">${data.email}</div>
          <div class="chat-message__time col-6 text-end">${data.time}</div>
      </div>
      <div class="chat-message__text">${data.text}</div>
  </div>`;

  chatBox.innerHTML += message;
}
