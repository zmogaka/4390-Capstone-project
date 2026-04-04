const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const darkModeToggle = document.querySelector('.dark-mode-toggle');
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
    document.body.setAttribute('data-theme', savedTheme);
  }

  updateThemeButton();

  // switches between light and dark mode
  darkModeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeButton();
  });
}

renderCarDetailsPage();

function updateThemeButton() {
  // changes the button text to match the next theme option
  const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
  darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
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
}
