$.ajax({
  url: "http://localhost:5000/chatgemini/history",
  type: "GET",
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  success: function (data) {
    console.log(data);
    localStorage.setItem("history_gemini", JSON.stringify(data));
    var ul = $("#components-nav");
    ul.empty();

    for (var session_ids in data) {
      var li = $('<li"></li>');
      // in li insert i tag with class is "bi bi-circle" and span is session_ids
      var butt = $(
        '<button class="nav-link btn-history-chat" id="btn-history-chat" data-session-id="' +
          session_ids +
          '"><i class="bi bi-circle"></i><span>' +
          session_ids +
          "</span></button>"
      );
      li.append(butt);
      ul.append(li);
    }
  },
});

function scrollToBottom() {
  var chatHistory = document.getElementById("chat-history");
  chatHistory.scrollTop = chatHistory.scrollHeight;
}
$(document).ready(function () {
  $(document).on("click", ".btn-history-chat", function () {
    $(".btn-history-chat i")
      .removeClass("bi-circle-fill")
      .addClass("bi-circle");
    $(this).find("i").removeClass("bi-circle").addClass("bi-circle-fill");
    localStorage.setItem("sessionId", $(this).text());
    var session_id = $(this).text();
    history_chat = localStorage.getItem("history_gemini");
    history_chat = JSON.parse(history_chat);
    history_chat_session = history_chat[session_id];

    var chatHistory = document.getElementById("chat-history");
    // Clear the chat history
    chatHistory.innerHTML = "";

    for (var key in history_chat_session) {
      var message = history_chat_session[key];
      var messageDiv = document.createElement("div");
      var cardBody = document.createElement("div");
      var image = document.createElement("img");

      if (parseInt(key) % 2 === 0) {
        // User message
        content_message = message["human"];
        messageDiv.className = "card user-message";
        image.src = "./assets/img/avatar-ds.jpg";
        image.alt = "User";
        image.className = "user-image";
      } else {
        // Bot message
        content_message = message["ai"];
        messageDiv.className = "card bot-message";
        image.src =
          "https://th.bing.com/th/id/R.dec45b829bcadab7124de8e1a5df2263?rik=eoFrojBvo%2f3heg&pid=ImgRaw&r=0";
        image.alt = "Bot";
        image.className = "bot-image";
      }

      image.textContent = image.alt;
      messageDiv.appendChild(image);
      cardBody.className = "card-body";
      cardBody.textContent = content_message;
      messageDiv.appendChild(cardBody);
      chatHistory.appendChild(messageDiv);
    }
    scrollToBottom();
  });
});
