// Sample mock data (we will fetch real data from a database or API)
const mockPartsData = [
    { partNumber: 'A123', description: 'Brake Pad', manufacturer: 'Brand A', compatible: ['Model X', 'Model Y'] },
    { partNumber: 'B456', description: 'Oil Filter', manufacturer: 'Brand B', compatible: ['Model Z'] },
    { partNumber: 'C789', description: 'Air Filter', manufacturer: 'Brand C', compatible: ['Model X', 'Model Z'] },
];

// Function to handle the search
function searchParts() {
    const searchInput = document.getElementById('searchInput').value.toUpperCase();
    const resultsContainer = document.getElementById('resultsContainer');
    const filteredParts = mockPartsData.filter(part => part.partNumber.includes(searchInput));

    // Clear previous results
    resultsContainer.innerHTML = '';

    // If no results found
    if (filteredParts.length === 0) {
        resultsContainer.innerHTML = '<p>No results found. Try a different part number.</p>';
        return;
    }

    // Display search results
    const ul = document.createElement('ul');
    filteredParts.forEach(part => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${part.description} (${part.manufacturer})</h3>
            <p>Part Number: ${part.partNumber}</p>
            <p>Compatible Models: ${part.compatible.join(', ')}</p>
        `;
        ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
}
