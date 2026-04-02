const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const darkModeToggle = document.querySelector('.dark-mode-toggle');

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

function updateThemeButton() {
  // changes the button text to match the next theme option
  const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
  darkModeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
}
