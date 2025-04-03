const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const botResponses = [
    'Interesting!',
    'Hi',
    'How are you?',
    'Thanks!',
    'Hope you are good!',
    'Welcome back!',
    'Sweet of you!'
];

function addMessage(isUser, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageDiv.innerHTML = `
        <div class="text">${text}</div>
        <div class="timestamp">${timestamp}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const userText = messageInput.value.trim();
    if (!userText) return;

    addMessage(true, userText);
    messageInput.value = '';

    setTimeout(() => {
        const botText = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(false, botText);
    }, 1000 + Math.random() * 1000);
}

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});