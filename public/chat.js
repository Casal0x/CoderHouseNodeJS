const socket = io();

    const username = window.prompt("Enter the username");
    socket.emit('new user', username);

    const messageForm = document.getElementById('message_area');
    const textInput = document.getElementById('text_area');

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (textInput.value) {socket.emit('new message', textInput.value);
            textInput.value = '';
        }
    });

    socket.on('send message', (data) => {
        const messageList = document.getElementById('message_list');
        const chatItem = document.createElement('li');
        chatItem.textContent = data.user + ': ' + data.message;
        messageList.appendChild(chatItem);
        window.scrollTo(0, document.body.scrollHeight);
    });