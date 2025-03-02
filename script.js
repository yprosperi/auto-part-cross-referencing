// Load data from updated JSON file
let partsData = [];
fetch('assets/car_parts_data_updated.json') // Ensure JSON is in /assets/
    .then(response => response.json())
    .then(data => partsData = data)
    .catch(error => console.error('Error loading parts data:', error));

// Function to handle the search
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase();
    const sortOption = document.getElementById('sortOption').value;

    // Redirect to results page with query parameters
    window.location.href = `results.html?query=${encodeURIComponent(searchInput)}&sort=${encodeURIComponent(sortOption)}`;
}
