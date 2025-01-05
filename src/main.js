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
  
    // Check for ARM-based or mobile devices using userAgentData if available
    const isARM = navigator.userAgentData
      ? navigator.userAgentData.platform.toLowerCase().includes("arm")
      : /arm|aarch64/i.test(navigator.userAgent);
  
    // Check for mobile user agents
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    // Function to detect if a mobile device requested the desktop version
    const isDesktopRequested = () => {
        // Check if the user agent includes desktop OS identifiers or if the user agent data indicates a desktop request
        return window.navigator.userAgent.includes("Macintosh") ||
            window.navigator.userAgent.includes("Windows") ||
            (navigator.userAgentData && navigator.userAgentData.mobile === false);
    };
  
    if (((isMobile) || (isMobile && isDesktopRequested()) || (isARM) || (isARM && isDesktopRequested())) && footer) {
      footer.style.display = "none";
    }
});
  