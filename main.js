const onIndex = (window.location.pathname == "/index.html");    // true if page is index.html, false otherwise (meaning we are on saved.html)
var listingsRow = onIndex ? document.getElementById("featuredListings") : document.getElementById("savedListings");
var map = null;

// Init Leaflet map if on index.html
if (onIndex) {
    map = L.map('map').setView([43.14049, -79.25282], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

const houses = JSON.parse(localStorage.getItem("houses"));   // Fetch houses from local storage

// Generate listing cards for each house and add them to the page
for (let i = 0; i < houses.length; i++) {
    const house = houses[i];
    if (!(onIndex || house.saved)) continue;    // if on saved.html, skip house if it is not saved

    // Make house card and add to listings row
    const card = makeCard(house, i, false);
    var cardDiv = document.createElement('div');
    cardDiv.className = "col-md-4";
    cardDiv.innerHTML = card;
    listingsRow.appendChild(cardDiv);

    // Add map markers for listings if on index.html
    if (onIndex) {
        const coords = house.coordinates;
        const markerCard = makeCard(house, i, true);
        var houseMarker = L.marker(coords).addTo(map);
        houseMarker.bindPopup(markerCard);
    }
}

// if on saved.html, show a message if no listings are currently saved
if (!onIndex && listingsRow.children.length == 0) {
    let div = document.createElement('div');
    div.className = "mb-3 mt-3 text-center";
    let h = document.createElement('h3');
    h.innerText = "You have no saved listings."
    div.appendChild(h);
    listingsRow.appendChild(div);
}

// Makes a listing card, either plain or for the map
function makeCard(house, i, marker) {
    const thumbnail = "/images/" + house.thumbnail;
    const price = house.price.toLocaleString();
    const address = house.address + ", " + house.city + ", " + house.province;
    const beds = house.beds;
    const baths = house.baths;
    const area = house.area + " " + house.areaUnits;

    return `
    <div class="card">
        <img src="${thumbnail}" class="card-img-top" alt="Property Image">
        <div class="card-body">
        <h5 class="card-title">$${price}</h5>
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
            <i class="fa fa-square-o"></i> ${area}
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