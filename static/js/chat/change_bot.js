const gptButton = document.querySelectorAll('#btn-chat-gpt');
gptButton.forEach(button => {
    button.addEventListener('click', function() {
        // Code to change the link when clicked
        let sessionId = uuid.v4();
        localStorage.setItem("sessionId", sessionId);
        window.location.href = "chat-gpt.html"
    });
})

const geminiButton = document.querySelectorAll('#btn-chat-gemini');
geminiButton.forEach(button => {
    button.addEventListener('click', function() {
        // Code to change the link when clicked
        let sessionId = uuid.v4();
        localStorage.setItem("sessionId", sessionId);
        window.location.href = "chat-gemini.html"
    });
})