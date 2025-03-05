// Load data from updated JSON file
let partsData = [];
fetch('https://raw.githubusercontent.com/yprosperi/auto-part-cross-referencing/main/assets/cross_reference.json')
    .then(response => response.json())
    .then(data => partsData = data)
    .catch(error => {
        console.error('Error loading parts data:', error);
        document.getElementById('loadingSpinner').style.display = "none"; // Hide spinner on error
        document.getElementById('resultsContainer').innerHTML = '<p>Error loading results.</p>';
    });

// Function to handle the search and open a new page
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.trim().toUpperCase();
    const sortOptionElement = document.getElementById('sortOption');
    const sortOption = sortOptionElement ? sortOptionElement.value : "";

    if (!searchInput) {
        alert("Please enter a part number or description.");
        return;
    }

    // Redirect to results page with query parameters in a new tab
    window.open(`results.html?query=${encodeURIComponent(searchInput)}&sort=${encodeURIComponent(sortOption)}`, '_blank');
}
