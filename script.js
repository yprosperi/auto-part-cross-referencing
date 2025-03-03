// Load data from updated JSON file
let partsData = [];
fetch('https://raw.githubusercontent.com/yprosperi/auto-part-cross-referencing/main/assets/car_parts_data_updated.json')
    .then(response => response.json())
    .then(data => {
        partsData = data;
    })
    .catch(error => console.error('Error loading parts data:', error));

// Function to handle the search and open a new page with query parameters
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase();
    const sortOptionElement = document.getElementById('sortOption');
    const sortOption = sortOptionElement ? sortOptionElement.value : ""; // Default to empty string if not found
    
    // Redirect to results page with query parameters in a new tab
    window.open(`results.html?query=${encodeURIComponent(searchInput)}&sort=${encodeURIComponent(sortOption)}`, '_blank');
}

// Function to handle the display of results on the results page
function displayResults() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query').toUpperCase();
    const sortOption = params.get('sort');

    // Filter the data based on search query
    let filteredData = partsData.filter(part => {
        return part.description.toUpperCase().includes(query) || part.partNumber.includes(query);
    });

    // Sort the data based on selected sort option
    if (sortOption === "manufacturer") {
        filteredData.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
    } else if (sortOption === "description") {
        filteredData.sort((a, b) => a.description.localeCompare(b.description));
    }

    // Display the filtered and sorted results
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (filteredData.length > 0) {
        filteredData.forEach(part => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${part.description}</h3>
                <p>Part Number: ${part.partNumber}</p>
                <p>Manufacturer: ${part.manufacturer}</p>
                <p>Price: $${part.price}</p>
                <p>Available at: ${part.availableAt}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found for your search.</p>';
    }
}

// Call the displayResults function when the results page is loaded
if (window.location.pathname.includes('results.html')) {
    displayResults();
}

