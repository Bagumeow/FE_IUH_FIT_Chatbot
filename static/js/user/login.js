let sessionId = uuid.v4();
$("form").on("submit", function (e) {
  e.preventDefault();
  email_user = $('input[name="username"]').val();
  password_user = $('input[name="password"]').val();
  data_json = {
    email: email_user,
    password: password_user,
  };
  $.ajax({
    url: "http://localhost:5000/login",
    type: "POST",
    data: JSON.stringify(data_json),
    contentType: "application/json",
    success: function (data) {
      token = data.access_token;
      // create a uuid code
      sessionId = uuid.v4();

      localStorage.setItem("token", token);
      localStorage.setItem("sessionId", sessionId);
      window.location.href = "chat-gemini.html";
    },
    error: function (data) {
      console.log(data);
      alert("Tài khoản hoặc mật khẩu không đúng");
    },
  });
});