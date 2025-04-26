document.addEventListener('DOMContentLoaded', async function() {
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
});