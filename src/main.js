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