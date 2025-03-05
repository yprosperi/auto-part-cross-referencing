function displayResults() {
    if (partsData.length === 0) {
        console.warn("Parts data not loaded yet, retrying...");
        setTimeout(displayResults, 100);
        return;
    }

    console.log("Parts Data:", partsData);

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
