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
    const year = document.getElementById('yearSelect').value;
    const make = document.getElementById('makeSelect').value;
    const model = document.getElementById('modelSelect').value;

    const searchQuery = searchInputElement ? searchInputElement.value.trim().toUpperCase() : "";
    const sortOption = sortOptionElement ? sortOptionElement.value : "";

    if (!searchQuery && (!year || !make || !model)) {
        alert("Please enter a part number/description or select Year, Make, and Model.");
        return;
    }

    const queryParams = new URLSearchParams({
        query: searchQuery,
        sort: sortOption,
        year,
        make,
        model
    });

    window.open(`results.html?${queryParams.toString()}`, '_blank');
}

// CarQuery vehicle dropdown logic
const carquery = new CarQuery();

function initCarQuery() {
    carquery.init();
    carquery.setFilters({ sold_in_us: true });
    carquery.initYearMakeModelTrim("yearSelect", "makeSelect", "modelSelect", null);

    document.getElementById("yearSelect").addEventListener("change", () => {
        document.getElementById("makeSelect").disabled = false;
    });

    document.getElementById("makeSelect").addEventListener("change", () => {
        document.getElementById("modelSelect").disabled = false;
    });
}

window.addEventListener('DOMContentLoaded', initCarQuery)
