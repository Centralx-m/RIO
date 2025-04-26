
// SHA-256 Hash of password "RioSecure123"
// Generated using online SHA256 tools
const ADMIN_PASSWORD_HASH = "90e18f37bdb0f84258c65fb2fdf88ad65e26eaa2398a94dbe7b1b2bc0087f1c9";

async function checkPassword() {
    const inputPassword = document.getElementById('adminPassword').value;
    const hash = await sha256(inputPassword);

    if (hash === ADMIN_PASSWORD_HASH) {
        document.getElementById('loginBox').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        loadApplications();
    } else {
        alert("Incorrect Password!");
    }
}

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function logout() {
    document.getElementById('adminContent').style.display = 'none';
    document.getElementById('loginBox').style.display = 'block';
    document.getElementById('adminPassword').value = '';
}

async function loadApplications() {
    const tableBody = document.querySelector('#applicationsTable tbody');

    try {
        const response = await fetch('/api/getApplications');
        const applications = await response.json();

        applications.forEach(app => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${app.business_name}</td>
                <td>${app.owner_name}</td>
                <td>${app.email}</td>
                <td>${app.phone}</td>
                <td>${app.loan_amount}</td>
                <td>${app.purpose}</td>
                <td>${new Date(app.created_at).toLocaleString()}</td>
            `;

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        tableBody.innerHTML = '<tr><td colspan="7">Failed to load applications.</td></tr>';
    }
}