const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const PAGE_LOAD_DELAY = 1200;
const CONTENT_LOAD_DELAY = 800;
const BUTTON_DELAY = 650;
const CAR_DATA = {
  'toyota-supra': {
    name: 'Toyota Supra',
    label: 'Sport coupe',
    subtitle: 'A quick two-door made for fun weekend drives and sporty city trips.',
    image: 'images/3acf2c99f99354d7e898cce7eb17a19293761b6e.png',
    imageAlt: 'Toyota Supra parked at an angle',
    specs: [
      '2 seats',
      'Automatic transmission',
      'Turbocharged gas engine',
      'Apple CarPlay and premium audio'
    ],
    baseRate: '$37/day',
    insuranceRate: '$8/day',
    totalRate: '$45/day'
  },
  'toyota-camry': {
    name: 'Toyota Camry',
    label: 'Comfort sedan',
    subtitle: 'A smooth daily driver with plenty of room for errands, work, or road trips.',
    image: 'images/bf67752caa2bc43080dd3bb3404a6be46a2e1ee6.png',
    imageAlt: 'Toyota Camry shown in profile',
    specs: [
      '5 seats',
      'Automatic transmission',
      'Hybrid-friendly fuel economy',
      'Bluetooth and lane assist'
    ],
    baseRate: '$52/day',
    insuranceRate: '$13/day',
    totalRate: '$65/day'
  },
  'tesla-model-3': {
    name: 'Tesla Model 3',
    label: 'Electric favorite',
    subtitle: 'A quiet all-electric sedan that works well for commuting and longer drives.',
    image: 'images/949071b429e9a21ffe97f024915ea145618aae77.png',
    imageAlt: 'Tesla Model 3 parked outdoors',
    specs: [
      '5 seats',
      'Automatic transmission',
      'Electric range: 333 miles',
      'Autopilot and backup camera'
    ],
    baseRate: '$61/day',
    insuranceRate: '$14/day',
    totalRate: '$75/day'
  },
  'ford-explorer': {
    name: 'Ford Explorer',
    label: 'Family SUV',
    subtitle: 'A roomy SUV with flexible cargo space for group travel and weekend trips.',
    image: 'images/331bb8dc2a8fc379808626909359086a470045e2.png',
    imageAlt: 'Ford Explorer shown from the front at an angle',
    specs: [
      '7 seats',
      'Automatic transmission',
      'All-wheel drive available',
      'Bluetooth and backup camera'
    ],
    baseRate: '$44/day',
    insuranceRate: '$11/day',
    totalRate: '$55/day'
  }
};

if (hamburger && navMenu) {
  // opens and closes the mobile menu
  hamburger.addEventListener('click', () => {
    const menuIsOpen = navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', menuIsOpen);
  });

  // closes the menu after a link is clicked
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

if (darkModeToggle) {
  // keeps the last theme the user picked
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    applyTheme(savedTheme);
  }

  // switches between light and dark mode
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

renderCarDetailsPage();
renderBookingPage();
setupInitialPageLoader();
setupHomePageLoading();
setupSearchResultsLoading();
setupInteractiveLoadingButtons();
setupBookingFormLoading();
setupCitySearch();
setupSearchResultsHeader();
 
/* dark mode helper functions */
function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
}

function renderCarDetailsPage() {
  if (!document.body.classList.contains('car-details-page')) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedCarId = params.get('car');
  const fallbackCarId = 'ford-explorer';
  const selectedCar = CAR_DATA[requestedCarId] || CAR_DATA[fallbackCarId];

  const carName = document.getElementById('car-name');
  const carLabel = document.getElementById('car-label');
  const carSubtitle = document.getElementById('car-subtitle');
  const carImage = document.getElementById('car-image');
  const specList = document.getElementById('spec-list');
  const baseRate = document.getElementById('base-rate');
  const insuranceRate = document.getElementById('insurance-rate');
  const totalRate = document.getElementById('total-rate');

  if (!carName || !carLabel || !carSubtitle || !carImage || !specList || !baseRate || !insuranceRate || !totalRate) {
    return;
  }

  document.title = `DriveNow Car Details - ${selectedCar.name}`;
  carName.textContent = selectedCar.name;
  carLabel.textContent = selectedCar.label;
  carSubtitle.textContent = selectedCar.subtitle;
  carImage.src = selectedCar.image;
  carImage.alt = selectedCar.imageAlt;
  baseRate.textContent = selectedCar.baseRate;
  insuranceRate.textContent = selectedCar.insuranceRate;
  totalRate.textContent = selectedCar.totalRate;

  specList.innerHTML = '';
  selectedCar.specs.forEach((spec) => {
    const specItem = document.createElement('li');
    specItem.textContent = spec;
    specList.appendChild(specItem);
  });

  const rentNowBtn = document.getElementById('rent-now-btn');
  if (rentNowBtn) {
    const carId = requestedCarId || fallbackCarId;
    rentNowBtn.href = `booking.html?car=${carId}`;
  }
}

function renderBookingPage() {
  if (!document.body.classList.contains('booking-page')) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedCarId = params.get('car');
  const fallbackCarId = 'ford-explorer';
  const selectedCar = CAR_DATA[requestedCarId] || CAR_DATA[fallbackCarId];

  const basePerDay = parseInt(selectedCar.baseRate.replace(/\D/g, ''));
  const insurancePerDay = parseInt(selectedCar.insuranceRate.replace(/\D/g, ''));

  const pickUp = new Date('2024-06-15');
  const dropOff = new Date('2024-06-20');
  const days = Math.round((dropOff - pickUp) / (1000 * 60 * 60 * 24));

  const totalPrice = (basePerDay + insurancePerDay) * days;

  const carName = document.getElementById('booking-car-name');
  const insurance = document.getElementById('booking-insurance');
  const total = document.getElementById('booking-total');
  const carImage = document.getElementById('booking-car-image');
  const daysEl = document.getElementById('booking-days');

  if (carName) carName.textContent = selectedCar.name;
  if (insurance) insurance.textContent = selectedCar.insuranceRate;
  if (total)     total.textContent = `$${totalPrice}.00`;
  if (carImage) {
    carImage.src = selectedCar.image;
    carImage.alt = selectedCar.imageAlt;
  }

  document.title = `DriveNow Booking - ${selectedCar.name}`;
}

function showLoading(container, loadingClass) {
  if (!container || !loadingClass) {
    return;
  }

  container.classList.remove('is-initial-loading', 'is-results-loading');
  container.classList.add(loadingClass);
}

function hideLoading(container, loadingClass) {
  if (!container || !loadingClass) {
    return;
  }

  container.classList.remove(loadingClass);
}

function setButtonLoadingState(button, isLoading) {
  if (!button) {
    return;
  }

  if (!button.dataset.originalText) {
    button.dataset.originalText = button.textContent.trim();
  }

  const loadingText = button.dataset.loadingText || 'Loading...';

  if (isLoading) {
    button.textContent = loadingText;
    button.classList.add('button-loading');

    if (button.tagName === 'BUTTON') {
      button.disabled = true;
    }

    return;
  }

  button.textContent = button.dataset.originalText;
  button.classList.remove('button-loading');

  if (button.tagName === 'BUTTON') {
    button.disabled = false;
  }
}

function setupInitialPageLoader() {
  const pageLoader = document.getElementById('page-loader');

  if (!pageLoader) {
    return;
  }

  const skipPageLoader = sessionStorage.getItem('skipPageLoader') === 'true';

  if (skipPageLoader) {
    sessionStorage.removeItem('skipPageLoader');
    pageLoader.classList.add('is-hidden');
    return;
  }

  window.setTimeout(() => {
    pageLoader.classList.add('is-hidden');
  }, PAGE_LOAD_DELAY);
}

function setupHomePageLoading() {
  if (!document.body.classList.contains('home-page')) {
    return;
  }

  const featuredSection = document.querySelector('.featured-section');
  const searchInput = document.getElementById('location-search');
  const cards = Array.from(document.querySelectorAll('#featured-cards .car-card'));

  if (!featuredSection || !searchInput || cards.length === 0) {
    return;
  }

  window.setTimeout(() => {
    hideLoading(featuredSection, 'is-initial-loading');
  }, PAGE_LOAD_DELAY);

  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    cards.forEach((card) => {
      const cardSearchText = card.dataset.search || '';
      const shouldShow = !searchTerm || cardSearchText.includes(searchTerm);
      card.hidden = !shouldShow;
    });
  });
}

function setupSearchResultsLoading() {
  if (!document.body.classList.contains('search-results-page')) {
    return;
  }

  // only show the inline loader for real results actions, not the filter or sort dropdowns
  const resultsSection = document.querySelector('.results');
  const resultsLoader = document.getElementById('search-results-loading');
  const triggerButtons = document.querySelectorAll('[data-results-loading-trigger]');

  if (!resultsSection || !resultsLoader || triggerButtons.length === 0) {
    return;
  }

  triggerButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (resultsSection.classList.contains('is-loading')) {
        return;
      }

      resultsSection.classList.add('is-loading');
      resultsLoader.hidden = false;
      setButtonLoadingState(button, true);

      window.setTimeout(() => {
        resultsSection.classList.remove('is-loading');
        resultsLoader.hidden = true;
        setButtonLoadingState(button, false);
      }, CONTENT_LOAD_DELAY);
    });
  });
}

function setupInteractiveLoadingButtons() {
  const listingCards = document.querySelectorAll('.car-card, .card');
  const detailButtons = document.querySelectorAll('.primary-button, .secondary-button');

  listingCards.forEach((card) => {
    const loadingTarget = card.querySelector('.view-btn, .details-btn');

    if (!loadingTarget) {
      return;
    }

    loadingTarget.dataset.loadingText = 'Loading...';

    card.addEventListener('click', (event) => {
      if (card.classList.contains('is-loading')) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      card.classList.add('is-loading');
      setButtonLoadingState(loadingTarget, true);
      sessionStorage.setItem('skipPageLoader', 'true');

      window.setTimeout(() => {
        window.location.href = card.href;
      }, BUTTON_DELAY);
    });
  });

  detailButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (button.classList.contains('button-loading')) {
        event.preventDefault();
        return;
      }

      const parentLink = button.closest('a[href]');
      setButtonLoadingState(button, true);

      if (parentLink) {
        event.preventDefault();
        sessionStorage.setItem('skipPageLoader', 'true');

        window.setTimeout(() => {
          window.location.href = parentLink.href;
        }, BUTTON_DELAY);
        return;
      }

      window.setTimeout(() => {
        setButtonLoadingState(button, false);
      }, CONTENT_LOAD_DELAY);
    });
  });
}
/*validation, error messages, confirmation for booking form submission*/
function setupBookingFormLoading() {
  const bookingForm = document.querySelector('.booking-form');
  const submitButton = bookingForm ? bookingForm.querySelector('.btn-confirm') : null;

  if (!bookingForm || !submitButton) {
    return;
  }

  //grab all inputs and their error spans
  const nameInput = bookingForm.querySelector('#name');
  const emailInput = bookingForm.querySelector('#email');
  const phoneInput = bookingForm.querySelector('#phone');
  const licenseInput = bookingForm.querySelector('#license');
  const paymentInput = bookingForm.querySelector('#payment');

  const nameError = bookingForm.querySelector('#name-error');
  const emailError = bookingForm.querySelector('#email-error');
  const phoneError = bookingForm.querySelector('#phone-error');
  const licenseError = bookingForm.querySelector('#license-error');
  const paymentError = bookingForm.querySelector('#payment-error');

 // ── helpers ───────────────────────────────────
  function showError(input, errorEl, message) {
    input.classList.remove('input-valid');
    input.classList.add('input-invalid');
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function showValid(input, errorEl) {
    input.classList.remove('input-invalid');
    input.classList.add('input-valid');
    errorEl.textContent = '';
    errorEl.hidden = true;
  }

  // -─ validators for each input ────────────────────────────────────
  function validateName() {
    const value = nameInput.value.trim();
    if(!value) {
      showError(nameInput, nameError, 'Name is required.');
      return false;
    }
    if(value.length < 2) {
      showError(nameInput, nameError, 'Name must be at least 2 characters long.');
      return false;
    }
    showValid(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!value) {
      showError(emailInput, emailError, 'Email is required.');
      return false;
    }
    if(!emailRegex.test(value)) {
      showError(emailInput, emailError, 'Please enter a valid email address.');
      return false;
    }
    showValid(emailInput, emailError);
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    const phoneRegex =  /^\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}$/;
    if(!value) {
      showError(phoneInput, phoneError, 'Phone number is required.');
      return false;
    }
    if(!phoneRegex.test(value)) {
      showError(phoneInput, phoneError, 'Please enter a valid 10-digit phone number.');
      return false;
    }
    showValid(phoneInput, phoneError);
    return true;
  }

  function validateLicense() {
    const value = licenseInput.value.trim();
    if(!value) {
      showError(licenseInput, licenseError, 'License information is required.');
      return false;
    }
    if(value.length < 5) {
      showError(licenseInput, licenseError, 'License information must be at least 5 characters long.');
      return false;
    }
    showValid(licenseInput, licenseError);
    return true;
  }

  function validatePayment() {
    const value = paymentInput.value.trim().replace(/\s/g, '');
    if(!paymentInput.value.trim()) {
      showError(paymentInput, paymentError, 'Payment information is required.');
      return false;
    }
    if(!/^\d{16}$/.test(value)) {
      showError(paymentInput, paymentError, 'Please enter a valid 16-digit card number.');
      return false;
    }
    showValid(paymentInput, paymentError);
    return true;
  }

  // ── real-time listeners ────────────────────────────────────

  //name: check on blur only
  nameInput.addEventListener('blur', validateName);

  //email: check format while typing and on blur
  emailInput.addEventListener('input', validateEmail);
  emailInput.addEventListener('blur', validateEmail);

  //phone: check on blur only
  phoneInput.addEventListener('blur', validatePhone);

  //license: check on blur only
  licenseInput.addEventListener('blur', validateLicense);

  //payment: check format while typing and on blur
  paymentInput.addEventListener('input', validatePayment);
  paymentInput.addEventListener('blur', validatePayment);

  // ── form submission handler ────────────────────────────────────
  submitButton.dataset.loadingText = 'Processing...';

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // validate all fields and show errors if invalid
    const allValid = 
    validateName() && 
    validateEmail() && 
    validatePhone() && 
    validateLicense() && 
    validatePayment();

    if (!allValid) return;

      setButtonLoadingState(submitButton, true);

      window.setTimeout(() => { 
        setButtonLoadingState(submitButton, false);
        /*if (typeof bookingForm.request === "function") {
        bookingForm.request();
    } else {
        bookingForm.submit(); 
    }*/
  // Hide the form once submission is "complete"
    bookingForm.style.display = 'none';

    const successContainer = document.createElement('div');
    successContainer.style.cssText = 'text-align: center; padding: 40px;';

    // Add the success message
    const msg = document.createElement('p');
    msg.textContent = 'Booking submitted successfully!';
    msg.style.cssText = 'color: #27ae60; font-weight: 600; font-size: 1.2rem;';

    // Create the "Back to Home" button
    const homeBtn = document.createElement('button');
    homeBtn.textContent = 'Return to Home';
    homeBtn.className = 'btn-confirm'; 
    homeBtn.style.marginTop = '20px';
    
    // Link it back to home
    homeBtn.onclick = () => { window.location.href = 'index.html'; };

    // Append everything to the section
    successContainer.appendChild(msg);
    successContainer.appendChild(homeBtn);
    bookingForm.parentElement.appendChild(successContainer);

}, CONTENT_LOAD_DELAY);
      });
    }

//Grab elements by the Id
const sortToggle = document.getElementById("sortToggle");
const sortDropdown = document.getElementById("mobileSortDropdown");
const mobileSortDropdown = document.getElementById("sortDropdown");
const container = document.querySelector(".container");

// Toggle dropdown
if (sortToggle && sortDropdown) {
  sortToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    sortDropdown.classList.toggle("active");
    mobileSortDropdown?.classList.remove("active");
  });
}

// Close dropdown if clicking outside
document.addEventListener("click", (e) => {
  if (sortDropdown && !e.target.closest(".sort-container")) {
    sortDropdown.classList.remove("active");
  }

  if (mobileSortDropdown && !e.target.closest(".sort-wrapper")) {
    mobileSortDropdown.classList.remove("active");
  }
});




//Filters
const makeInput = document.getElementById('makeFilter');
const modelInput = document.getElementById('modelFilter');

const mobileMakeInput = document.getElementById('mobileMakeFilter');
const mobileModelInput = document.getElementById('mobileModelFilter');


 function filterCars() {
  // desktop and mobile filters share the same card-matching logic
  const makeQuery = (makeInput?.value || mobileMakeInput?.value || '').toLowerCase();
  const modelQuery = (modelInput?.value || mobileModelInput?.value || '').toLowerCase();

  const cards = document.querySelectorAll('.container .card');
  const emptyMessage = document.getElementById('results-empty');

  let visibleCount = 0;

  cards.forEach(card => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';

    const match =
      title.includes(makeQuery) &&
      title.includes(modelQuery);

    card.style.display = match ? '' : 'none';

    if (match) visibleCount++;
  });

  if (emptyMessage) {
    emptyMessage.hidden = visibleCount !== 0;
  }
}

// desktop inputs
// selects filter once an option is chosen
makeInput?.addEventListener('change', filterCars);
modelInput?.addEventListener('change', filterCars);

// mobile inputs
// mobile dropdowns mirror the desktop filtering behavior
mobileMakeInput?.addEventListener('change', filterCars);
mobileModelInput?.addEventListener('change', filterCars);

function sortCards(type) {
  //Container with all the cards
  const container = document.querySelector(".container");

  if (!container) {
    return;
  }

  //Convert the list of cards into a array
  const cards = Array.from(container.querySelectorAll(".card"));

  //Creating a copy of the array
  let sortedCards = [...cards];

  //Sorting from high to low
  if (type === "price") {
    sortedCards.sort((a, b) => {

      //Getting the price of the first card
      const priceA = parseInt(a.querySelector(".price").textContent.replace(/\D/g, ""));

      //Getting the price of the second card
      const priceB = parseInt(b.querySelector(".price").textContent.replace(/\D/g, ""));
      return priceA - priceB;
    });
  }

  //Sort by make
  if (type === "make") {
    sortedCards.sort((a, b) => {

      //Get each cars name convert to lower case
      const nameA = a.querySelector("h3").textContent.toLowerCase();
      const nameB = b.querySelector("h3").textContent.toLowerCase();

      //Return the comparison
      return nameA.localeCompare(nameB);
    });
  }

  //Sort by year from newest to oldest
  if (type === "year") {
    sortedCards.sort((a, b) => {
      const yearA = parseInt(a.dataset.year || "0", 10);
      const yearB = parseInt(b.dataset.year || "0", 10);

      return yearB - yearA;
    });
  }
//Clear cards from the container
  container.innerHTML = "";

  //Add sorted cards back into the container in new order
  sortedCards.forEach(card => container.appendChild(card));
}

function showSortLoadingThenSort(type) {
  const resultsSection = document.querySelector('.results');
  const resultsLoader = document.getElementById('search-results-loading');

  if (!resultsSection || !resultsLoader) {
    sortCards(type);
    return;
  }

  // show the same centered loading animation before the sorted cards return
  resultsSection.classList.add('is-loading');
  resultsLoader.hidden = false;

  window.setTimeout(() => {
    sortCards(type);
    resultsSection.classList.remove('is-loading');
    resultsLoader.hidden = true;
  }, CONTENT_LOAD_DELAY);
}

//Add click listeners to all sort dropdown options
document.querySelectorAll(".sort-option").forEach(option => {
  option.addEventListener("click", () => {

    // remove active from all
    document.querySelectorAll(".sort-option").forEach(o => {
      o.classList.remove("active");
    });

    // set active on clicked one
    option.classList.add("active");

    sortDropdown?.classList.remove("active");
    mobileSortDropdown?.classList.remove("active");

    showSortLoadingThenSort(option.dataset.sort);
  });
});




  

//Mobile 
  
// --- Mobile Filter & Sort Integration ---
//references to mobile UI elements (filter button, filter menu, sort button)
const mobileFilterBtn = document.getElementById('mobileFilterBtn');
const mobileFilterMenu = document.getElementById('mobileFilterMenu');
const mobileSortBtn = document.getElementById('mobileSortBtn');

//Checking that both buttons exists.
if (mobileFilterBtn && mobileFilterMenu) {

  //toggle the mobile filter dropdown menu
  mobileFilterBtn.addEventListener('click', () => {

    //Toggle the "active" class to show/hide the filter menu
    mobileFilterMenu.classList.toggle('active');
   // stopLoading();
  });
}

if (mobileSortBtn && mobileSortDropdown) {
  mobileSortBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevents instant close
    mobileSortDropdown.classList.toggle("active");
    sortDropdown?.classList.remove("active");
  });
}
// Mobile "Sort by Price"
//Checks if the sort button is on the screen
/*if (mobileSortBtn) {
  //Listener to trigger sorting on mobile
  mobileSortBtn.addEventListener('click', () => {
    //Stops loading before updating UI
    stopLoading(); 
//Convert the cards into an array
    const cards = Array.from(document.querySelectorAll('.card'));
    //Get the container that holds the cards
    const container = document.querySelector('.container');
//Sort the cards from low to high
    const sortedCards = cards.sort((a, b) => {
      
      //Grab the price from the first card
      const priceA = parseInt(a.querySelector('.price').textContent.replace(/\D/g, ''), 10);

      //Grab the price of the second card
      const priceB = parseInt(b.querySelector('.price').textContent.replace(/\D/g, ''), 10);

      //Return the comparison
      return priceA - priceB;
    });
//Clear the cards from the container
    container.innerHTML = '';

    //Add sorted cards back into the container
    sortedCards.forEach(card => container.appendChild(card));
  });
}*/

// --- Extend stopLoading to work with mobile controls ---


// ── CITY SEARCH AUTOCOMPLETE (Index.html) ──────────────────────────────────
 
// A broad list of US cities in "City, ST" format
const US_CITIES = [
  "New York, NY","Los Angeles, CA","Chicago, IL","Houston, TX","Phoenix, AZ",
  "Philadelphia, PA","San Antonio, TX","San Diego, CA","Dallas, TX","San Jose, CA",
  "Austin, TX","Jacksonville, FL","Fort Worth, TX","Columbus, OH","Charlotte, NC",
  "Indianapolis, IN","San Francisco, CA","Seattle, WA","Denver, CO","Nashville, TN",
  "Oklahoma City, OK","El Paso, TX","Washington, DC","Las Vegas, NV","Louisville, KY",
  "Memphis, TN","Portland, OR","Baltimore, MD","Milwaukee, WI","Albuquerque, NM",
  "Tucson, AZ","Fresno, CA","Sacramento, CA","Mesa, AZ","Kansas City, MO",
  "Atlanta, GA","Omaha, NE","Colorado Springs, CO","Raleigh, NC","Long Beach, CA",
  "Virginia Beach, VA","Minneapolis, MN","Tampa, FL","New Orleans, LA","Arlington, TX",
  "Bakersfield, CA","Honolulu, HI","Anaheim, CA","Aurora, CO","Santa Ana, CA",
  "Corpus Christi, TX","Riverside, CA","Lexington, KY","St. Louis, MO","Pittsburgh, PA",
  "Stockton, CA","Anchorage, AK","Cincinnati, OH","St. Paul, MN","Greensboro, NC",
  "Toledo, OH","Newark, NJ","Plano, TX","Henderson, NV","Orlando, FL",
  "Jersey City, NJ","Chandler, AZ","St. Petersburg, FL","Laredo, TX","Norfolk, VA",
  "Madison, WI","Durham, NC","Lubbock, TX","Winston-Salem, NC","Garland, TX",
  "Glendale, AZ","Hialeah, FL","Reno, NV","Baton Rouge, LA","Irvine, CA",
  "Chesapeake, VA","Irving, TX","Scottsdale, AZ","North Las Vegas, NV","Fremont, CA",
  "Gilbert, AZ","San Bernardino, CA","Birmingham, AL","Boise, ID","Rochester, NY",
  "Richmond, VA","Spokane, WA","Des Moines, IA","Montgomery, AL","Modesto, CA",
  "Fayetteville, NC","Tacoma, WA","Shreveport, LA","Fontana, CA","Moreno Valley, CA",
  "Glendale, CA","Akron, OH","Huntington Beach, CA","Little Rock, AR","Columbus, GA",
  "Augusta, GA","Grand Rapids, MI","Oxnard, CA","Tallahassee, FL","Salt Lake City, UT",
  "Huntsville, AL","Worcester, MA","Knoxville, TN","Providence, RI","Brownsville, TX",
  "Santa Clarita, CA","Garden Grove, CA","Oceanside, CA","Fort Lauderdale, FL","Chattanooga, TN",
  "Tempe, AZ","Cape Coral, FL","Eugene, OR","Rancho Cucamonga, CA","Peoria, AZ",
  "Ontario, CA","Springfield, MO","Elk Grove, CA","Salem, OR","Cary, NC",
  "Hayward, CA","Fort Collins, CO","Lancaster, CA","Salinas, CA","Springfield, IL",
  "Palmdale, CA","Sunnyvale, CA","Pomona, CA","Escondido, CA","Kansas City, KS",
  "Surprise, AZ","Rockford, IL","Torrance, CA","Paterson, NJ","Bridgeport, CT",
  "Alexandria, VA","Hollywood, FL","Macon, GA","Mesquite, TX","Syracuse, NY",
  "Savannah, GA","Pasadena, TX","McAllen, TX","Dayton, OH","Lakewood, CO",
  "Sunnyvale, CA","Clarksville, TN","Killeen, TX","Warren, MI","Hampton, VA",
  "Columbia, SC","Fullerton, CA","West Valley City, UT","Visalia, CA","Sterling Heights, MI",
  "Coral Springs, FL","New Haven, CT","Olathe, KS","Bellevue, WA","Hartford, CT",
  "Athens, GA","Roseville, CA","Elizabeth, NJ","Gainesville, FL","Stamford, CT",
  "Concord, CA","Thousand Oaks, CA","Waco, TX","Topeka, KS","Simi Valley, CA",
  "Cedar Rapids, IA","Victorville, CA","Carrollton, TX","Midland, TX","Murfreesboro, TN",
  "Miramar, FL","Columbia, MO","Independence, MO","Peoria, IL","El Monte, CA",
  "Lansing, MI","Palm Bay, FL","Pompano Beach, FL","Clovis, CA","Denton, TX",
  "Provo, UT","Torrance, CA","Fargo, ND","Roseville, CA","Tallahassee, FL",
  "Ann Arbor, MI","Flint, MI","Rialto, CA","Birmingham, AL","Pueblo, CO",
  "South Fulton, GA","Marietta, GA","Alpharetta, GA","Decatur, GA","Sandy Springs, GA"
];
 
function setupCitySearch() {
  const searchInput = document.getElementById('location-search');
  if (!searchInput) return;
 
  const wrapper = searchInput.parentElement;
 
  // Wrap input in a relative-position div for dropdown positioning
  const autocompleteWrap = document.createElement('div');
  autocompleteWrap.className = 'autocomplete-wrap';
  wrapper.insertBefore(autocompleteWrap, searchInput);
  autocompleteWrap.appendChild(searchInput);
 
  // Dropdown list
  const dropdown = document.createElement('ul');
  dropdown.className = 'city-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-label', 'City suggestions');
  dropdown.hidden = true;
  autocompleteWrap.appendChild(dropdown);
 
  // Toast message box shown on invalid submit attempt
  let toastTimer = null;
  const toast = document.createElement('div');
  toast.className = 'city-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.textContent = 'Please select a valid city from the suggestions.';
  document.body.appendChild(toast);
 
  let activeIndex = -1;
  let validCitySelected = false; // tracks whether current input value is a known city
 
  function isValidCity(value) {
    return US_CITIES.some(c => c.toLowerCase() === value.trim().toLowerCase());
  }
 
  function clearError() {
    searchInput.classList.remove('input-error');
  }
 
  function showError() {
    searchInput.classList.add('input-error');
    // Shake animation — remove and re-add class so it re-triggers
    searchInput.classList.remove('input-shake');
    void searchInput.offsetWidth; // force reflow
    searchInput.classList.add('input-shake');
    // Show toast and auto-dismiss after 3 seconds
    toast.classList.add('city-toast--visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('city-toast--visible');
    }, CONTENT_LOAD_DELAY);
  }
 
  function renderSuggestions(matches) {
    dropdown.innerHTML = '';
    activeIndex = -1;
 
    if (!matches.length) {
      dropdown.hidden = true;
      return;
    }
 
    matches.slice(0, 6).forEach((city) => {
      const li = document.createElement('li');
      li.textContent = city;
      li.setAttribute('role', 'option');
      li.dataset.city = city;
 
      li.addEventListener('mousedown', (e) => {
        e.preventDefault(); // prevent blur before click registers
        selectCity(city);
      });
 
      dropdown.appendChild(li);
    });
 
    dropdown.hidden = false;
  }
 
  function selectCity(city) {
    searchInput.value = city;
    validCitySelected = true;
    dropdown.hidden = true;
    activeIndex = -1;
    clearError();
    sessionStorage.setItem('searchLocation', city);
    sessionStorage.setItem('skipPageLoader', 'true');
    window.location.href = 'searchResults.html';
  }
 
  function tryNavigate() {
    const value = searchInput.value.trim();
    if (!value) {
      showError();
      return;
    }
    if (isValidCity(value)) {
      selectCity(
        US_CITIES.find(c => c.toLowerCase() === value.toLowerCase())
      );
    } else {
      showError();
    }
  }
 
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    validCitySelected = false; // user is typing again, reset validity
    clearError();
 
    if (query.length === 0) {
      sessionStorage.removeItem('searchLocation');
      dropdown.hidden = true;
      return;
    }
 
    if (query.length < 1) {
      dropdown.hidden = true;
      return;
    }
 
    const matches = US_CITIES.filter(c => c.toLowerCase().includes(query));
    renderSuggestions(matches);
  });
 
  // Keyboard navigation
  searchInput.addEventListener('keydown', (e) => {
    const items = dropdown.querySelectorAll('li');
 
    if (e.key === 'ArrowDown') {
      if (!items.length) return;
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    } else if (e.key === 'ArrowUp') {
      if (!items.length) return;
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        selectCity(items[activeIndex].dataset.city);
      } else {
        tryNavigate();
      }
    } else if (e.key === 'Escape') {
      dropdown.hidden = true;
    }
  });
 
  // Hide dropdown when focus leaves
  searchInput.addEventListener('blur', () => {
    setTimeout(() => { dropdown.hidden = true; }, 150);
  });
}
 
// ── SEARCH RESULTS HEADER (searchResults.html) ────────────────────────────
 
function setupSearchResultsHeader() {
  const titleEl = document.querySelector('.resultTitle');
  if (!titleEl) return;
 
  const location = sessionStorage.getItem('searchLocation');
  const cards = document.querySelectorAll('.container .card');
  const visibleCards = Array.from(cards).filter(c => c.style.display !== 'none');
  const count = visibleCards.length;
 
  if (location) {
    titleEl.textContent = `Showing ${count} car${count !== 1 ? 's' : ''} near ${location}`;
  } else {
    titleEl.textContent = `Showing ${count} car${count !== 1 ? 's' : ''}`;
  }
}
