var nav = document.createElement("nav");
nav.className = "navbar navbar-expand-lg navbar-dark bg-dark";
nav.innerHTML = `
<div class="container">
    <a class="navbar-brand" href="/index.html">House World</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <a class="nav-link" href="/index.html">Buy / Rent</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/new_listing.html">Sell</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/saved.html">Saved Listings</a>
        </li>
        </ul>
        <a href="/login.html">
            <button class="btn btn-secondary">Log In</button>
        </a>
    </div>
</div>
`;
document.body.appendChild(nav);