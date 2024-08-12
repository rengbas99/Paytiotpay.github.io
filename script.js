document.addEventListener("DOMContentLoaded", function() {
    // Function to parse URL parameters
    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            Id: params.get('Id'),
            TrackingId: params.get('TrackingId'),
            Amount: params.get('Amount'),
            Message: params.get('Message'),
            State: params.get('State'),
            Status: params.get('Status')
        };
    }

    // Get the parameters from the URL
    const response = getQueryParams();

    // Display the received response on the page
    const responseDataElement = document.getElementById("responseData");
    if (responseDataElement) {
        responseDataElement.textContent = JSON.stringify(response, null, 4);
    }

    // Set up the button click event to send the final request
    const sendRequestButton = document.getElementById("sendRequest");
    if (sendRequestButton) {
        sendRequestButton.addEventListener("click", function() {
            const apiEndpoint = "https://api.ugpayments.ch/merchants/83459/ThreeDSaleTransactions"; // Replace with your actual API endpoint

            // Prepare the data to be sent in the final POST request
            const finalRequestData = {
                VerifyTransactionId: response.Id // Use the 'Id' from the URL query params
            };

            fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(finalRequestData)
            })
            .then(res => res.json())
            .then(data => {
                // Display the final API response on the page
                const finalResponseElement = document.getElementById("finalResponseData");
                if (finalResponseElement) {
                    finalResponseElement.textContent = JSON.stringify(data, null, 4);
                }

                // Show the final response section
                const finalResponseSection = document.getElementById("finalResponse");
                if (finalResponseSection) {
                    finalResponseSection.style.display = "block";
                }
            })
            .catch(error => {
                // Display an error message if something goes wrong
                const errorElement = document.getElementById("error");
                if (errorElement) {
                    errorElement.textContent = "Error: " + error.message;
                    errorElement.style.display = "block";
                }
                console.error("Error:", error);
            });
        });
    }
});


