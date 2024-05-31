$(document).ready(function() {
  $('#yourEmail').on('input', function() {
    var email = $(this).val();
    if (email && !email.endsWith('student.iuh.edu.vn')) {
      $(this).next('.invalid-feedback').show();
    } else {
      $(this).next('.invalid-feedback').hide();
    }
  });
});

function checkEmail(email) {
  return email.endsWith("student.iuh.edu.vn");
}

$("form").on("submit", function(e) {
  e.preventDefault();
  name_user = $('input[name="name"]').val();
  email_user = $('input[name="email"]').val();
  username = $('input[name="username"]').val();
  password_user = $('input[name="password"]').val();
  data_signup = {
    full_name: name_user,
    email: email_user,
    user_name: username,
    password: password_user,
  };
  if (checkEmail(email_user)) {
    $.ajax({
      url: "http://localhost:5000/register",
      type: "POST",
      data: JSON.stringify(data_signup),
      contentType: "application/json",
      success: function (response) {
        alert("Sign up success");
        window.location.href = "pages-login.html";
      },
      error: function (response) {
        alert("Sign up failed");
      },
    });
    return;
  }
});
