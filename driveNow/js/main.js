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

  updateThemeButton();

  // switches between light and dark mode
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeButton();
  });
}

renderCarDetailsPage();
renderBookingPage();
setupInitialPageLoader();
setupHomePageLoading();
setupSearchResultsLoading();
setupInteractiveLoadingButtons();
setupBookingFormLoading();

function updateThemeButton() {
  // keeps the button text matched with the active theme
  const isDarkMode = getCurrentTheme() === 'dark';
  darkModeToggle.textContent = isDarkMode ? 'Dark Mode' : 'Light Mode';
}

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

  const carName = document.getElementById('booking-car-name');
  const insurance = document.getElementById('booking-insurance');
  const total = document.getElementById('booking-total');
  const carImage = document.getElementById('booking-car-image');

  if (carName) carName.textContent = selectedCar.name;
  if (insurance) insurance.textContent = selectedCar.insuranceRate;
  if (total) total.textContent = selectedCar.totalRate;
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
  const emptyState = document.getElementById('results-empty');
  let searchTimerId;

  if (!featuredSection || !searchInput || cards.length === 0 || !emptyState) {
    return;
  }

  window.setTimeout(() => {
    hideLoading(featuredSection, 'is-initial-loading');
  }, PAGE_LOAD_DELAY);

  const runSearchLoading = () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    showLoading(featuredSection, 'is-results-loading');

    window.setTimeout(() => {
      let visibleCount = 0;

      cards.forEach((card) => {
        const cardSearchText = card.dataset.search || '';
        const shouldShow = !searchTerm || cardSearchText.includes(searchTerm);
        card.hidden = !shouldShow;

        if (shouldShow) {
          visibleCount += 1;
        }
      });

      emptyState.hidden = visibleCount !== 0;
      hideLoading(featuredSection, 'is-results-loading');
    }, CONTENT_LOAD_DELAY);
  };

  searchInput.addEventListener('input', () => {
    window.clearTimeout(searchTimerId);
    searchTimerId = window.setTimeout(runSearchLoading, 250);
  });
}

function setupSearchResultsLoading() {
  if (!document.body.classList.contains('search-results-page')) {
    return;
  }

  const resultsSection = document.querySelector('.results');
  const resultsLoader = document.getElementById('search-results-loading');
  const triggerButtons = document.querySelectorAll('.orangebtn, .whitebtn');

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

function setupBookingFormLoading() {
  const bookingForm = document.querySelector('.booking-form');
  const submitButton = bookingForm ? bookingForm.querySelector('.btn-confirm') : null;

  if (!bookingForm || !submitButton) {
    return;
  }

  submitButton.dataset.loadingText = 'Loading...';

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    setButtonLoadingState(submitButton, true);

    window.setTimeout(() => {
      setButtonLoadingState(submitButton, false);
      bookingForm.reset();
      window.alert('Booking submitted successfully.');
    }, CONTENT_LOAD_DELAY);
  });
}

//Grab elements by the Id
const sortToggle = document.getElementById("sortToggle");
const sortDropdown = document.getElementById("sortDropdown");
const container = document.querySelector(".container");

// Toggle dropdown
sortToggle.addEventListener("click", () => {
  sortDropdown.classList.toggle("active");
});

// Close dropdown if clicking outside
document.addEventListener("click", (e) => // What we click
{
  if (!e.target.closest(".sort-container")) //If you clicked outside the dropdown area
  {
    sortDropdown.classList.remove("active"); //closes the dropdown
  }
});




//Filters
const makeInput = document.getElementById('makeFilter');
const modelInput = document.getElementById('modelFilter');

const mobileMakeInput = document.getElementById('mobileMakeFilter');
const mobileModelInput = document.getElementById('mobileModelFilter');


 function filterCars() {
  const makeQuery = (makeInput?.value || mobileMakeInput?.value || '').toLowerCase();
  const modelQuery = (modelInput?.value || mobileModelInput?.value || '').toLowerCase();

  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';

    const match =
      title.includes(makeQuery) &&
      title.includes(modelQuery);

    card.style.display = match ? '' : 'none';
  });
}

// desktop inputs
makeInput?.addEventListener('input', filterCars);
modelInput?.addEventListener('input', filterCars);

// mobile inputs
mobileMakeInput?.addEventListener('input', filterCars);
mobileModelInput?.addEventListener('input', filterCars);

function sortCards(type) {
  //Container with all the cards
  const container = document.querySelector(".container");

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
//Clear cards from the container
  container.innerHTML = "";

  //Add sorted cards back into the container in new order
  sortedCards.forEach(card => container.appendChild(card));
}

//Add click listeners to all sort dropdown options
document.querySelectorAll(".sort-option").forEach(option => {
  option.addEventListener("click", () => {

    // // Sort cards based on clicked option's data-sort value
    sortCards(option.dataset.sort);

    //// Close the sort dropdown after selection
    sortDropdown.classList.remove("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const mobileSortBtn = document.getElementById('mobileSortBtn');

  if (mobileSortBtn) {
    mobileSortBtn.addEventListener('click', () => {
      sortCards("price");
    });
  }
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

// Mobile "Sort by Price"
//Checks if the sort button is on the screen
if (mobileSortBtn) {
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
}

// --- Extend stopLoading to work with mobile controls ---

