let tilt = document.querySelectorAll(".rounded");
VanillaTilt.init(tilt, {
  max: 3,
  speed: 500,
  scale: 1.05,
  glare: true,
  "max-glare": 0.3,
});

var theme_toggler = document.getElementById('theme-toggler');

// Load saved theme on page load
loadSavedTheme();

theme_toggler.addEventListener('click', function(e) {
  toggleTheme(this.checked);
  // Save the current theme state
  saveTheme(this.checked);
});

function toggleTheme(value) {
  var targets = document.querySelector('.light-mode');
  var navLogoImg = document.querySelector('.nav-logo img');
  const navLinks = document.querySelector('.nav-links');

  navLinks.classList.remove('active');

  if (value) {
    targets.classList.add('dark-mode');
    // Replace the image by setting a new src.
    navLogoImg.src = 'assets/r-blue.png';
  }
  else {
    targets.classList.remove('dark-mode');
    navLogoImg.src = 'assets/r-purple.png';
  }
}

function saveTheme(isDark) {
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadSavedTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  // If no saved theme, default to light mode
  if (savedTheme === null) {
    theme_toggler.checked = false;
    toggleTheme(false);
    return;
  }
  
  // Apply saved theme
  const isDark = savedTheme === 'dark';
  theme_toggler.checked = isDark;
  toggleTheme(isDark);
}

document.addEventListener("DOMContentLoaded", function() {
  const educationTab = document.getElementById('education-tab');
  const experienceTab = document.getElementById('experience-tab');
  const educationTimeline = document.getElementById('education');
  const experienceTimeline = document.getElementById('experience');
  // Event listener for Education tab
  educationTab.addEventListener('click', () => {
    educationTimeline.style.display = 'block';
    experienceTimeline.style.display = 'none';
    educationTab.classList.add('qualification__active');
    experienceTab.classList.remove('qualification__active');
  });

  // Event listener for Experience tab
  experienceTab.addEventListener('click', () => {
    educationTimeline.style.display = 'none';
    experienceTimeline.style.display = 'block';
    experienceTab.classList.add('qualification__active');
    educationTab.classList.remove('qualification__active');
  });
});

const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const linkToggles = document.querySelectorAll('.nav-links-a');

linkToggles.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});
  