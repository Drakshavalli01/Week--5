document.addEventListener('DOMContentLoaded', () => {
    const citiesContainer = document.getElementById('citiesContainer');
    const apiUrl = 'https://api.npoint.io/7bbd3a59c401f616bb89';

    // Function to handle and display errors
    function handleError(error) {
        console.error('Error:', error);
        citiesContainer.innerHTML = `
            <div class="error-message">
                <p>Something went wrong: ${error.message}. Please try again later.</p>
            </div>
        `;
    }

    // Fetch JSON data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                // Throw an error if the response status is not OK
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Log the data to inspect its structure
            console.log('Fetched JSON data:', data);

            // Check if the data is an array
            if (!Array.isArray(data)) {
                throw new Error('Unexpected data structure: expected an array of city objects');
            }

            // Clear any previous content
            citiesContainer.innerHTML = '';

            // Process and display data
            data.forEach(city => {
                // Ensure city object has the expected properties
                if (!city.name || !city.state || !city.population || !city.area) {
                    throw new Error('City object missing expected properties');
                }

                const cityCard = document.createElement('div');
                cityCard.className = 'city-card';

                cityCard.innerHTML = `
                    <h2>${city.name}</h2>
                    <p><strong>State:</strong> ${city.state}</p>
                    <p><strong>Population:</strong> ${city.population}</p>
                    <p><strong>Area:</strong> ${city.area}</p>
                `;

                citiesContainer.appendChild(cityCard);
            });
        })
        .catch(error => {
            // Handle errors during the fetch process
            handleError(error);
        });
});