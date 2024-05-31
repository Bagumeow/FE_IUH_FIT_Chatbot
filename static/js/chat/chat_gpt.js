// chat scripts

function scrollToBottom() {
    var chatHistory = document.getElementById("chat-history");
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }
  function sendMessage() {
    var message = document.getElementById("user-message").value;
    if (!message) {
      return;
    }
    var chatHistory = document.getElementById("chat-history");
    // Create a new div for the user message
    var userMessageDiv = document.createElement("div");
    userMessageDiv.className = "card user-message";
    // Create a new div for the card body and append the message to it
    var userCardBody = document.createElement("div");
    var userImage = document.createElement("img");
    userImage.src = "./assets/img/avatar-ds.jpg";
    userImage.alt = "User";
    userImage.className = "user-image";
    userImage.textContent = "User";
    userMessageDiv.appendChild(userImage);
    userCardBody.className = "card-body";
    userCardBody.textContent = message;
    // Append the card body to the user message div
    userMessageDiv.appendChild(userCardBody);
    // Append the user message div to the chat history
    chatHistory.appendChild(userMessageDiv);
    // Clear the input field
    //  load bearer token
    var sessionId = localStorage.getItem("sessionId");
    document.getElementById("user-message").value = "";
    // Create a new div for the bot message
    var botMessageDiv = document.createElement("div");
    botMessageDiv.className = "card bot-message";
    // Create a new image for the bot avatar and append it to the bot message div
    var botImage = document.createElement("img");
    botImage.src =
      "https://th.bing.com/th/id/R.dec45b829bcadab7124de8e1a5df2263?rik=eoFrojBvo%2f3heg&pid=ImgRaw&r=0";
    botImage.alt = "Bot";
    botImage.className = "bot-image";
    botImage.textContent = "Bot";
    botMessageDiv.appendChild(botImage);
  
    // Create a new div for the card body and append the bot message to it
    var botCardBody = document.createElement("div");
    botCardBody.className = "card-body";
  
    var spinner = document.createElement("div");
    spinner.className = "spinner-border text-primary";
    spinner.role = "status";
    var spinnerLabel = document.createElement("span");
    spinnerLabel.className = "visually-hidden";
    spinnerLabel.textContent = "Loading...";
    spinner.appendChild(spinnerLabel);
    botCardBody.appendChild(spinner);
  
    botMessageDiv.appendChild(botCardBody);
    chatHistory.appendChild(botMessageDiv);
  
    data_json = {
      question: message,
      session_id: sessionId,
    };
    scrollToBottom();
    $.ajax({
      url: "http://localhost:5000/chatgpt",
      type: "POST",
      data: JSON.stringify(data_json),
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      contentType: "application/json",
      success: function (response) {
        // Remove the spinner once the response is received
        botCardBody.removeChild(spinner);
        // Set the bot message
        botCardBody.textContent = response.answer;
        scrollToBottom();
      },
      error: function () {
        // Remove the spinner if there's an error
        botCardBody.removeChild(spinner);
        botCardBody.textContent = "Error occurred";
      },
    });
    // Simulate a bot response
  }
  