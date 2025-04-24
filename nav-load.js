var nav = document.createElement("nav");
nav.className = "navbar sticky-top navbar-expand-lg navbar-dark bg-dark";
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
        <div class="d-flex">
            ${isLoggedIn ? `
                <a href="/account.html">
                    <button class="btn btn-outline-light">Account</button>
                </a>
            ` : `
                <a href="/create-account.html">
                    <button class="btn btn-primary me-2">Sign Up</button>
                </a>
                <a href="/login.html">
                    <button class="btn btn-secondary">Log In</button>
                </a>
            `}
        </div>
    </div>
</div>
`;
document.body.appendChild(nav);
// 💡 Highlight the active nav link
const currentPath = window.location.pathname;
const navLinks = nav.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
    link.setAttribute('aria-current', 'page');
  } else {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  }
});
