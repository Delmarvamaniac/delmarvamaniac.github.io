const onIndex = (window.location.pathname == "/index.html" || window.location.pathname == "/");    // true if page is index.html (homepage), false otherwise (meaning we are on saved.html)
var listingsRow = onIndex ? document.getElementById("featuredListings") : document.getElementById("savedListings");
var map = null;
var listingSort = document.getElementById("listingSort");

// Init Leaflet map if on index.html
if (onIndex) {
    map = L.map('map').setView([43.14049, -79.25282], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

const priceLowHigh = (a, b) => {
    return a.price - b.price;
}

const priceHighLow = (a, b) => {
    return b.price - a.price;
}

const dateRecent = (a, b) => {
    return new Date(b.date) - new Date(a.date);
}

const dateOldest = (a, b) => {
    return new Date(a.date) - new Date(b.date);
}

window.addEventListener("load", (event) => {
    displayListings(listingSort.value);
});

listingSort.addEventListener("change", (event) => {
    listingsRow.innerHTML = "";     // clear previous sorted content when changing sort
    displayListings(event.target.value);
});

function displayListings(sort) {
    var houses = JSON.parse(localStorage.getItem("houses")); // Fetch houses

    // Get search filter inputs
    var cityInput = document.getElementById('searchCity').value.trim().toLowerCase();
    var minPriceInput = parseInt(document.getElementById('searchMinPrice').value.trim());
    var maxPriceInput = parseInt(document.getElementById('searchMaxPrice').value.trim());
    var bedsInput = parseInt(document.getElementById('searchBeds').value);
    var bathsInput = parseInt(document.getElementById('searchBaths').value);

    // Filter houses based on search criteria
    houses = houses.filter(house => {
        let matches = true;

        if (cityInput && !house.city.toLowerCase().includes(cityInput)) {
            matches = false;
        }
        if (!isNaN(minPriceInput) && house.price < minPriceInput) {
            matches = false;
        }
        if (!isNaN(maxPriceInput) && house.price > maxPriceInput) {
            matches = false;
        }
        if (!isNaN(bedsInput) && house.beds !== bedsInput) {
            matches = false;
        }
        if (!isNaN(bathsInput) && house.baths !== bathsInput) {
            matches = false;
        }

        return matches;
    });

    // Now sort the filtered houses
    switch (sort) {
        case "1": houses = houses.sort(dateRecent); break;
        case "2": houses = houses.sort(dateOldest); break;
        case "3": houses = houses.sort(priceLowHigh); break;
        default: houses = houses.sort(priceHighLow);
    }

    // Clear previous listings
    listingsRow.innerHTML = "";

    // Display filtered and sorted houses
    for (let i = 0; i < houses.length; i++) {
        const house = houses[i];
        if (!(onIndex || house.saved)) continue;

        const card = makeCard(house, house.id, false);
        var cardDiv = document.createElement('div');
        cardDiv.className = "col-md-4";
        cardDiv.innerHTML = card;
        listingsRow.appendChild(cardDiv);

        if (onIndex) {
            const coords = house.coordinates;
            const markerCard = makeCard(house, house.id, true);
            var houseMarker = L.marker(coords).addTo(map);
            houseMarker.bindPopup(markerCard);
        }
    }

    if (listingsRow.children.length == 0) {
        let div = document.createElement('div');
        div.className = "mb-3 mt-3 text-center";
        let h = document.createElement('h3');
        h.innerText = onIndex ? "No listings match your search filters." : "You have no saved listings."
        div.appendChild(h);
        listingsRow.appendChild(div);
    }
}


// Makes a listing card, either plain or for the map
function makeCard(house, i, marker) {
    const thumbnail = "/images/" + house.thumbnail;
    const price = house.price.toLocaleString();
    const address = house.address + ", " + house.city + ", " + house.province;
    const beds = house.beds;
    const baths = house.baths;
    const area = house.area + " " + house.areaUnits;
    const date = house.date;
    const forSale = house.forSale;

    return `
    <div class="card mb-3">
        <img src="${thumbnail}" class="card-img-top" style="width: 100%; ${!marker ? 'height: 15vw;' : 'height: 8vw;'} object-fit: cover;" alt="Property Image">
        <div class="card-body">
        <div class="row">
            <div class="col">
                <h5 class="card-title">$${forSale ? price : price + "/month"}</h5>
            </div>
            <div class="col text-end">
                <p><i class="fa fa-calendar"></i> ${date}</p>
            </div>
        </div>
        <p><i class="fa fa-map-marker"></i> ${address}</p>
        <div class="row">
            <div class="col-4 text-center">
            <i class="fa fa-bed"></i> ${beds}
            ${!marker ? '<p class="mb-0">Bedrooms</p>' : ''}
            </div>
            <div class="col-4 text-center">
            <i class="fa fa-bath"></i> ${baths}
            ${!marker ? '<p class="mb-0">Bathrooms</p>' : ''}
            </div>
            <div class="col-4 text-center">
            <i class="fa fa-square"></i> ${area}
            ${!marker ? '<p class="mb-0">Area</p>' : ''}
            </div>
        </div>
        </div>
        <div class="card-footer">
        <div class="row">
        <div class="col-12">
            <!-- View Listing Button that takes up the entire footer -->
            <a href="/property.html?id=${i}">
            <button class="btn btn-secondary w-100">View Listing</button> <!-- w-100 makes it take full width -->
            </a>
        </div>
        </div>
        </div>
    </div>
    `;
}