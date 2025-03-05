// Initialize empty array for parts data
let partsData = [];

// Load data from updated JSON file
fetch('https://raw.githubusercontent.com/yprosperi/auto-part-cross-referencing/main/assets/cross_reference.json')
    .then(response => response.json())
    .then(data => {
        // Convert object to array format
        partsData = Object.entries(data).flatMap(([description, manufacturers]) =>
            Object.entries(manufacturers).map(([manufacturer, partNumber]) => ({
                description,
                partNumber,
                manufacturer
            }))
        );

        // If already on results.html, trigger displayResults
        if (window.location.pathname.includes('results.html')) {
            displayResults();
        }
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

// Function to display search results on results.html
function displayResults() {
    // Wait until data is fully loaded
    if (partsData.length === 0) {
        setTimeout(displayResults, 100); // Retry after 100ms
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const query = params.get('query') ? params.get('query').toUpperCase() : "";
    const sortOption = params.get('sort');

    // Filter the data based on search query
    let filteredData = partsData.filter(part => 
        part.description.toUpperCase().includes(query) || part.partNumber.includes(query)
    );

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
                <p><strong>Part Number:</strong> ${part.partNumber}</p>
                <p><strong>Manufacturer:</strong> ${part.manufacturer}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found for your search.</p>';
    }
}

// Ensure results page loads results when opened
if (window.location.pathname.includes('results.html')) {
    setTimeout(displayResults, 100); // Initial delay to allow data to load
}
