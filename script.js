document.getElementById('loanForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const statusMessage = document.getElementById('statusMessage');

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            statusMessage.textContent = "Application submitted successfully!";
            statusMessage.style.color = "green";
            form.reset();
        } else {
            statusMessage.textContent = "Failed to submit application.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        statusMessage.textContent = "Error submitting application.";
        statusMessage.style.color = "red";
    }
});