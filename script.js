document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('https://api.co.uk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        displayResponse(result);
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayResponse(data) {
    const responseDiv = document.getElementById('response');
    if (data.ACSurl) {
        // Assuming you need to redirect to the ACS URL
        window.location.href = data.ACSurl;
    } else {
        responseDiv.innerHTML = 'No ACS URL found in response.';
    }
}
