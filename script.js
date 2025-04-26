document.getElementById('loanForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = e.target;
    const statusMessage = document.getElementById('statusMessage');

    // Here you can add code to send form data to a server or API
    // For now, we just show a success message
    statusMessage.textContent = "Application submitted successfully! Thank you.";

    form.reset();
});