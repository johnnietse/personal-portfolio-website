import '../styles/modern-normalize.css';
import '../styles/style.css';
import '../styles/components/header.css';
import '../styles/components/hero.css';
import '../styles/utils.css';
import '../styles/components/project.css';
import '../styles/components/about.css';
import '../styles/components/mobile-nav.css';
import '../redirect.js';
import mobileNav from '../mobile-nav';

mobileNav();

document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 1000, // Duration of the animation in milliseconds
        once: true,     // Whether animation should happen only once
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");
  
    // Detect ARM-based devices using navigator properties
    const isARM = navigator.platform && /arm|aarch64/i.test(navigator.platform);
  
    // Check for mobile user agents or ARM-based platform
    const isMobile = /iPhone|iPad|iPod|Android|armv/i.test(navigator.userAgent) || isARM;
  
    if (isMobile && footer) {
      footer.style.display = "none";
    }
});
  