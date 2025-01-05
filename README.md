# Personal Portfolio Website

This is the repository for my personal portfolio website. It showcases my projects, skills, and a brief introduction about me. The site is designed with modern web development practices, utilizing HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Fully responsive for an optimal user experience across devices.
- **Interactive Animations**: Uses AOS (Animate On Scroll) library for smooth scroll animations.
- **Mobile-Friendly Navigation**: Includes a mobile navigation menu for better usability.
- **Custom Footer Behavior**: The footer dynamically adjusts visibility based on the user's device type.

## File Structure

### HTML Files

1. **index.html**: 
   - The main entry point of the website.
   - Contains sections such as the header, hero section, projects, about, and footer.
   - Utilizes semantic HTML for better accessibility and SEO.

2. **projects.html**: 
   - Dedicated page to showcase detailed descriptions and images of my projects.

3. **about.html**: 
   - Provides an in-depth view of my background, skills, and experiences.

4. **contact.html**: 
   - A contact form and links to my social media platforms for easy communication.

### CSS Files

- **modern-normalize.css**: Ensures consistent styling across browsers by resetting default styles.
- **style.css**: Contains global styles and general layout rules.
- **components/**
  - `header.css`: Styles for the header section.
  - `hero.css`: Styles for the hero section, including the main introduction.
  - `project.css`: Styling for project cards and the project showcase.
  - `about.css`: Styles for the "About Me" section.
  - `mobile-nav.css`: Styling specific to the mobile navigation menu.

- **utils.css**: Utility classes for common styling patterns (e.g., margins, paddings, colors).

### JavaScript Files

1. **main.js**:
   - Imports styles and initializes key features.
   - Handles animations with AOS and includes logic for device-specific footer visibility.

2. **redirect.js**: 
   - Provides functionality for redirecting to different pages or sections.

3. **mobile-nav.js**:
   - Manages the behavior of the mobile navigation menu, enhancing usability on smaller screens.

### Vite Configuration

**vite.config.js**:
   - Configures Vite for building the website.
   - Specifies Rollup options to define multiple input points for the build process:
     ```javascript
     import { defineConfig } from 'vite';

     export default defineConfig({
       build: {
         rollupOptions: {
           input: {
             main: './index.html',
             about: './about.html',
             project: './project.html',
           },
         },
       },
     });
     ```
     
## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```
3. Open `index.html` in your browser to view the site locally.

## Technologies Used

- **HTML5**: Semantic and accessible structure.
- **CSS3**: Modern styling, animations, and responsiveness.
- **JavaScript**: Interactivity and dynamic content management.
- **AOS Library**: Smooth animations on scroll.
- **Vite**: Fast and optimized development/build tool.

---
## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

Feel free to explore and customize the repository to create your own portfolio site!

