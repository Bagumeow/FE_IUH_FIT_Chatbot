$(".btn-new-sesison").click(function () {
    let sessionId = uuid.v4();
    localStorage.setItem("sessionId", sessionId);
    // reload the page
    location.reload();
});