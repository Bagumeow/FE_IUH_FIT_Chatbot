const logoutButtons = document.querySelectorAll('#btn-log-out');

logoutButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Code to change the link when clicked
        window.localStorage.clear()
        window.location.href = "index.html"
    });
})