// Initialize empty array for parts data
let partsData = [];

// Load data from JSON file
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

        console.log("Parts Data Loaded:", partsData);

        // If already on results.html, trigger displayResults
        if (window.location.pathname.includes('results.html')) {
            displayResults();
        }
    })
    .catch(error => console.error('Error loading parts data:', error));

// Ensure search button is connected after DOM loads
document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchButton");
    if (searchButton) {
        searchButton.addEventListener("click", searchParts);
    }

    // If on results.html, display results
    if (window.location.pathname.includes('results.html')) {
        displayResults();
    }
});

// Function to handle search and open a new page with query parameters
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.trim().toUpperCase();
    const sortOptionElement = document.getElementById('sortOption');
    const sortOption = sortOptionElement ? sortOptionElement.value : ""; // Default to empty string if not found

    if (!searchInput) {
        alert("Please enter a search term.");
        return;
    }

    // Redirect to results page with query parameters in a new tab
    window.open(`results.html?query=${encodeURIComponent(searchInput)}&sort=${encodeURIComponent(sortOption)}`, '_blank');
}

// Function to display search results on results.html
function displayResults() {
    // Wait until data is fully loaded
    if (partsData.length === 0) {
        console.warn("Parts data not loaded yet, retrying...");
        setTimeout(displayResults, 100);
        return;
    }

    console.log("Displaying Results. Parts Data:", partsData);

    const params = new URLSearchParams(window.location.search);
    const query = params.get('query') ? params.get('query').toUpperCase() : "";
    const sortOption = params.get('sort');

    if (!Array.isArray(partsData) || partsData.length === 0) {
        console.error("Parts data is not loaded or is incorrectly formatted:", partsData);
        return;
    }

    // Filter the data safely
    let filteredData = partsData.filter(part => 
        part.description?.toUpperCase().includes(query) || part.partNumber?.includes(query)
    );

    // Sort the data safely
    if (sortOption === "manufacturer") {
        filteredData.sort((a, b) => a.manufacturer?.localeCompare(b.manufacturer));
    } else if (sortOption === "description") {
        filteredData.sort((a, b) => a.description?.localeCompare(b.description));
    }

    // Display results
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (filteredData.length > 0) {
        filteredData.forEach(part => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.innerHTML = `
                <h3>${part.description || "Unknown Description"}</h3>
                <p><strong>Part Number:</strong> ${part.partNumber || "N/A"}</p>
                <p><strong>Manufacturer:</strong> ${part.manufacturer || "Unknown"}</p>
            `;
            resultsContainer.appendChild(resultItem);
        });
    } else {
        resultsContainer.innerHTML = '<p>No results found for your search.</p>';
    }
}
