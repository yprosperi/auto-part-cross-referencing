// Load data from updated JSON file
let partsData = [];

fetch('https://raw.githubusercontent.com/yprosperi/auto-part-cross-referencing/main/assets/cross_reference.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        partsData = data;
        console.log("✅ Parts data loaded.");
    })
    .catch(error => {
        console.error('❌ Error loading parts data:', error);
        const spinner = document.getElementById('loadingSpinner');
        const container = document.getElementById('resultsContainer');
        if (spinner) spinner.style.display = "none";
        if (container) container.innerHTML = '<p>Error loading results.</p>';
    });

// Function to handle the search and open a new page
function searchParts() {
    const searchInputElement = document.getElementById('searchInput');
    const sortOptionElement = document.getElementById('sortOption');

    if (!searchInputElement) {
        alert("Search input not found.");
        return;
    }

    const searchQuery = searchInputElement.value.trim().toUpperCase();
    const sortOption = sortOptionElement ? sortOptionElement.value : "";

    if (!searchQuery) {
        alert("Please enter a part number or description.");
        return;
    }

    // Redirect to results page with search and sort as query params
    const queryParams = new URLSearchParams({
        query: searchQuery,
        sort: sortOption
    });

    window.open(`results.html?${queryParams.toString()}`, '_blank');
}
