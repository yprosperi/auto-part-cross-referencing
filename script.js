// Load data from updated JSON file
let partsData = [];
fetch('https://raw.githubusercontent.com/yprosperi/auto-part-cross-referencing/main/assets/car_parts_data_updated.json') // Ensure JSON is in /assets/
    .then(response => response.json())
    .then(data => partsData = data)
    .catch(error => console.error('Error loading parts data:', error));

// Function to handle the search and open a new page
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase();
   const sortOptionElement = document.getElementById('sortOption');
const sortOption = sortOptionElement ? sortOptionElement.value : ""; // Default to empty string if not found
    
    // Redirect to results page with query parameters in a new tab
    window.open(`results.html?query=${encodeURIComponent(searchInput)}&sort=${encodeURIComponent(sortOption)}`, '_blank');
}
