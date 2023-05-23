import WebSocketService from '/js/ws.js';
const wsService = new WebSocketService();

const msgEl = document.getElementById("messages");
const textEl = document.getElementById("message");

wsService.onmessage = (data) => {
    msgEl.innerHTML += `<div class="chat_message">${data.data}</div>`;
}

document.getElementById("send").addEventListener("click", () => {
    wsService.sendMessage(textEl.value);
    msgEl.innerHTML += `<div class="chat_message_me">${textEl.value}</div>`;
    textEl.value = "";
});