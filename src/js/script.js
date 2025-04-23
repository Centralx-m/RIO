// Add this to your existing form submission handler
form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  if (validateForm()) {
    const formData = {
      // Your existing form data collection
      // ...
    };

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok) {
        alert('Application submitted successfully!');
        form.reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit application. Please try again.');
    }
  }
});