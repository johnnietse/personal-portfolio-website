# Personal Portfolio Website

This is the repository for my personal portfolio website. It showcases my projects, skills, and a brief introduction about me. The site is designed with modern web development practices, utilizing HTML, CSS, and JavaScript.

---

## Features

- **Responsive Design**: Fully responsive for an optimal user experience across devices.
- **Interactive Animations**: Uses AOS (Animate On Scroll) library for smooth scroll animations.
- **Mobile-Friendly Navigation**: Includes a mobile navigation menu for better usability.
- **Custom Footer Behavior**: The footer dynamically adjusts visibility based on the user's device type.

---

## File Structure

### HTML Files

1. **index.html**: 
   - The main entry point of the website.
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

---
## Deployment

The website is deployed using Vercel for ease of use and scalability. Follow these steps to deploy your own version:

1. Sign up or log in to [Vercel](https://vercel.com/).
2. Link your GitHub repository to Vercel.
3. Configure the deployment settings if necessary (Vercel automatically detects Vite projects).
4. Deploy the project by clicking the "Deploy" button.
5. Your website will be live, and you will receive a custom URL.

---     
## How to Use

**Before cloning the repository, change your working directory to the folder where you want the project to be saved:**

Navigate to the directory where you want to store the project:
```bash
cd /path/to/your/directory
```

1. Clone the repository:
   ```bash
   git clone https://github.com/johnnietse/personal_portfolio_website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```
3. Run this in your terminal to set up a server that allows you to view the site locally on your local machine:
   ```bash
   npm run dev
   ```

---
## Technologies Used

- **HTML5**: Semantic and accessible structure.
- **CSS3**: Modern styling, animations, and responsiveness.
- **JavaScript**: Interactivity and dynamic content management.
- **AOS Library**: Smooth animations on scroll.
- **Vite**: Fast and optimized development/build tool.


---
## Mobile Usability Notice

### For Mobile Devices and Tablets

For an optimal browsing experience, it is highly recommended that you access the mobile version of this website on mobile devices and tablets. Requesting the desktop version on smaller screens may lead to a suboptimal user experience.

To ensure the best usability, please make sure to request the mobile website by default. The mobile version is designed to be responsive and user-friendly, offering quicker load times, better navigation, and a layout tailored for smaller screens.

### For Other Devices

For devices other than mobile devices and tablets, it is perfectly fine to use the desktop version of the website. The desktop version is optimized for larger screens, providing the best experience for users with laptops and desktops.

Thank you for visiting, and enjoy your experience!

---
## Portfolio Website Setup Guide

This guide walks you through setting up a development environment for creating a modern portfolio website. Follow the steps carefully to ensure your environment is configured correctly.



### Prerequisites

#### Install Required Tools
1. **Node.js**:
   - Visit [Node.js](https://nodejs.org/en) and download the LTS version.

2. **Git and Git Bash**:
   - Visit [Git SCM](https://git-scm.com/) and click "Download for Windows."

3. **Windows Terminal (for Windows users)**:
   - Open Microsoft Store, search for "Windows Terminal," and install it.
   - Configure Git Bash in Windows Terminal:
     1. Open Windows Terminal and click the dropdown arrow next to the tab.
     2. Select **Settings**.
     3. Add a new profile and name it "Git Bash."
     4. For the command line, browse to:
        `C:\Program Files\Git\bin\bash.exe`
     5. Set the starting directory to your desired location.
     6. For the icon, navigate to `C:\Program Files\Git\mingw64\share\git` and select the `git-for-windows.ico` file.
     7. Save the settings, set the default profile to "Git Bash," and close the interface.
   - To confirm the setup, open Windows Terminal and check for a tab labeled "MINGW64."

---

### Guides on Setting Up the Development Environment (if you want to build a personal portfolio website like I did)

We will use [Vite](https://vitejs.dev/) for its modern features and speed.

#### Steps:
1. **Visit the Vite Website**:
   - Go to the [Vite documentation](https://vitejs.dev/guide/) and review its features, such as:
     - **NPM Dependency Resolving and Pre-Bundling**: Allows seamless module imports.
     - **Hot Module Replacement**: Provides faster live-server functionality.
     - **CSS Code Splitting**: Optimizes builds with advanced CSS handling.

2. **Create Your Project**:
   - Open Windows Terminal (or your preferred terminal) and navigate to your desired directory using `pwd`.
   - Run the following command:
     ```bash
     npm create vite@latest
     ```
   - Follow the prompts:
     - **Project Name**: Enter your project name.
     - **Framework**: Choose `Vanilla`.
     - **Variant**: Select `JavaScript`.

3. **Initialize the Project**:
   ```bash
   cd <your-project-name>
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Open the generated URL in your browser to preview your project.

5. **Open Your Project in VS Code** (optional but recommended):
   ```bash
   code .
   ```

---

### Additional Setup

#### Normalize CSS:
1. Go to the [Modern Normalize GitHub Repository](https://github.com/sindresorhus/modern-normalize).
2. Open `modern-normalize.css` and click **Raw**.
3. Copy the code and paste it into a new file named `modern-normalize.css` in your project.
4. Import the CSS into `main.js`:
   ```javascript
   import './modern-normalize.css';
   ```
   - Place this import at the top for proper cascading priority.

#### Base CSS Setup:
- Define variables for:
  - Colors
  - Sizes
- Create utility classes for reusable styles (e.g., buttons, containers, spacings).

---

### Key Commands
- Start the development server:
  ```bash
  npm run dev
  ```
- Stop the server:
  - Press `Ctrl + C`.
- Build the project for deployment:
  ```bash
  npm run build
  ```
- Preview the build:
  ```bash
  npm run preview
  ```

---

### Notes:
- Vite handles CSS imports in JavaScript instead of HTML. Ensure your CSS is imported in `main.js`.
- Use the provided hot module replacement for instant updates in your browser during development.

---

You are now ready to start building your portfolio website. Happy coding!
