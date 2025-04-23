document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const previewBtn = document.getElementById('previewBtn');
    const modal = document.getElementById('previewModal');
    const closeBtn = document.querySelector('.close');
    const printBtn = document.getElementById('printBtn');
    const previewContent = document.getElementById('previewContent');

    // Add initial language entry
    addLanguageEntry();

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // In a real app, you would send data to server or serverless function
            // For this demo, we'll just show the preview
            generatePreview();
            modal.style.display = 'block';
        }
    });

    // Preview button click
    previewBtn.addEventListener('click', function() {
        if (validateForm()) {
            generatePreview();
            modal.style.display = 'block';
        }
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Print button
    printBtn.addEventListener('click', function() {
        window.print();
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--error-color)';
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    }

    // Generate preview content
    function generatePreview() {
        const formData = {
            personal: {
                fullName: document.getElementById('fullName').value,
                dob: document.getElementById('dob').value,
                gender: document.getElementById('gender').value,
                maritalStatus: document.getElementById('maritalStatus').value,
                nationality: document.getElementById('nationality').value,
                currentLocation: document.getElementById('currentLocation').value,
                experience: document.getElementById('experience').value
            },
            contact: {
                address1: document.getElementById('address1').value,
                address2: document.getElementById('address2').value,
                mobile: document.getElementById('mobile').value,
                email: document.getElementById('email').value,
                postalCode: document.getElementById('postalCode').value
            },
            education: [],
            certifications: [],
            additional: {
                skills: document.getElementById('skills').value,
                languages: []
            }
        };

        // Get education entries
        document.querySelectorAll('.education-entry').forEach(entry => {
            formData.education.push({
                yearFrom: entry.querySelector('.edu-year-from').value,
                yearTo: entry.querySelector('.edu-year-to').value,
                description: entry.querySelector('.edu-description').value
            });
        });

        // Get certification entries
        document.querySelectorAll('.certification-entry').forEach(entry => {
            formData.certifications.push({
                year: entry.querySelector('.cert-year').value,
                name: entry.querySelector('.cert-name').value,
                issuer: entry.querySelector('.cert-issuer').value
            });
        });

        // Get language entries
        document.querySelectorAll('.language-entry').forEach(entry => {
            formData.additional.languages.push({
                name: entry.querySelector('.lang-name').value,
                proficiency: entry.querySelector('.lang-proficiency').value
            });
        });

        // Generate HTML for preview
        let previewHTML = `
            <h3>Personal Details</h3>
            <p><strong>Full Name:</strong> ${formData.personal.fullName}</p>
            <p><strong>Date of Birth:</strong> ${formatDate(formData.personal.dob)}</p>
            <p><strong>Gender:</strong> ${capitalizeFirstLetter(formData.personal.gender)}</p>
            <p><strong>Marital Status:</strong> ${capitalizeFirstLetter(formData.personal.maritalStatus)}</p>
            <p><strong>Nationality:</strong> ${formData.personal.nationality}</p>
            <p><strong>Current Location:</strong> ${formData.personal.currentLocation}</p>
            <p><strong>Years of Experience:</strong> ${formData.personal.experience}</p>

            <h3>Contact Information</h3>
            <p><strong>Primary Address:</strong> ${formData.contact.address1}</p>
            ${formData.contact.address2 ? `<p><strong>Secondary Address:</strong> ${formData.contact.address2}</p>` : ''}
            <p><strong>Mobile:</strong> ${formData.contact.mobile}</p>
            <p><strong>Email:</strong> ${formData.contact.email}</p>
            <p><strong>Postal Code:</strong> ${formData.contact.postalCode}</p>

            <h3>Education Background</h3>
            ${formData.education.map(edu => `
                <p><strong>${edu.yearFrom}-${edu.yearTo}:</strong> ${edu.description}</p>
            `).join('')}

            <h3>Professional Certifications</h3>
            ${formData.certifications.map(cert => `
                <p><strong>${cert.year}:</strong> ${cert.name} (${cert.issuer})</p>
            `).join('')}

            <h3>Additional Information</h3>
            ${formData.additional.skills ? `<p><strong>Technical Skills:</strong> ${formData.additional.skills}</p>` : ''}
            
            <h4>Languages</h4>
            <ul>
                ${formData.additional.languages.map(lang => `
                    <li>${capitalizeFirstLetter(lang.name)} - ${capitalizeFirstLetter(lang.proficiency)}</li>
                `).join('')}
            </ul>
        `;

        previewContent.innerHTML = previewHTML;
    }

    // Helper functions
    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
});

// Dynamic form fields
function addEducationEntry() {
    const container = document.getElementById('educationEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'education-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Year From*</label>
                <input type="number" class="edu-year-from" min="1900" max="2099" required>
            </div>
            <div class="form-group">
                <label>Year To*</label>
                <input type="number" class="edu-year-to" min="1900" max="2099" required>
            </div>
        </div>
        <div class="form-group">
            <label>Institution & Description*</label>
            <input type="text" class="edu-description" required>
        </div>
        <button type="button" class="remove-btn" onclick="removeEducationEntry(this)">Remove</button>
    `;
    container.appendChild(newEntry);
}

function removeEducationEntry(button) {
    const entries = document.getElementById('educationEntries');
    if (entries.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('At least one education entry is required.');
    }
}

function addCertificationEntry() {
    const container = document.getElementById('certificationEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'certification-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Year*</label>
                <input type="number" class="cert-year" min="1900" max="2099" required>
            </div>
            <div class="form-group">
                <label>Certificate Name*</label>
                <input type="text" class="cert-name" required>
            </div>
        </div>
        <div class="form-group">
            <label>Issuing Body*</label>
            <input type="text" class="cert-issuer" required>
        </div>
        <button type="button" class="remove-btn" onclick="removeCertificationEntry(this)">Remove</button>
    `;
    container.appendChild(newEntry);
}

function removeCertificationEntry(button) {
    const entries = document.getElementById('certificationEntries');
    if (entries.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('At least one certification entry is required.');
    }
}

function addLanguageEntry() {
    const container = document.getElementById('languageEntries');
    const newEntry = document.createElement('div');
    newEntry.className = 'language-entry';
    newEntry.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <input type="text" class="lang-name" placeholder="Language" required>
            </div>
            <div class="form-group">
                <select class="lang-proficiency" required>
                    <option value="">Proficiency</option>
                    <option value="native">Native</option>
                    <option value="fluent">Fluent</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="basic">Basic</option>
                </select>
            </div>
        </div>
        <button type="button" class="remove-btn" onclick="removeLanguageEntry(this)">Remove</button>
    `;
    container.appendChild(newEntry);
}

function removeLanguageEntry(button) {
    const entries = document.getElementById('languageEntries');
    if (entries.children.length > 1) {
        button.parentElement.remove();
    } else {
        alert('At least one language entry is required.');
    }
              
