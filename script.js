// Load data from JSON file
let partsData = [];
fetch('car_parts_data2.json')
    .then(response => response.json())
    .then(data => partsData = data)
    .catch(error => console.error('Error loading parts data:', error));

// Function to handle the search
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase();
    const resultsContainer = document.getElementById('resultsContainer');
    
    // Filter by exact part number match
    let filteredParts = partsData.filter(part => part['Part Number'].includes(searchInput));
    
    // If no exact match, try finding similar descriptions
    if (filteredParts.length === 0) {
        filteredParts = partsData.filter(part => part.Description.toUpperCase().includes(searchInput));
    }
    
    // If still no match, try finding similar manufacturers
    if (filteredParts.length === 0) {
        filteredParts = partsData.filter(part => part.Manufacturer.toUpperCase().includes(searchInput));
    }

    // Clear previous results
    resultsContainer.innerHTML = '';

    // If no results found
    if (filteredParts.length === 0) {
        resultsContainer.innerHTML = '<p>No results found. Try a different part number, description, or manufacturer.</p>';
        return;
    }

    // Display search results
    const ul = document.createElement('ul');
    filteredParts.forEach(part => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${part.Description} (${part.Manufacturer})</h3>
            <p>Part Number: ${part['Part Number']}</p>
        `;
        ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
}
