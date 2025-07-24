👨‍🍳 Chef's Pal: Your Recipe Discovery Companion
Welcome to Chef's Pal! This is a modern and interactive web application designed to help you discover new recipes, view detailed cooking instructions, and manage your favorite dishes. It's a perfect companion for anyone who loves cooking and exploring culinary delights!

✨ Features
Recipe Search: Easily search for recipes by name using the powerful TheMealDB API. 🔍

Random Recipe Discovery: Get inspired with a random recipe displayed on page load. 🎲

Detailed Recipe View: Click on any recipe card to open a modal/sidebar with comprehensive details, including:

High-quality image of the dish. 📸

Full list of ingredients with measurements. 🥣

Step-by-step cooking instructions. 📝

Links to the original source and YouTube video (if available). 🔗▶️

Favorites Management: Add your beloved recipes to a favorites list for quick access. ❤️

Persistent Favorites: Your favorite recipes are saved locally in your browser's localStorage, so they're always there when you return. 💾

Remove from Favorites: Easily remove recipes from your favorites list. 🗑️

Responsive Design: Enjoy a seamless experience across various devices (desktop, tablet, mobile). 📱💻

Intuitive User Experience: Modals close with a click on the overlay or by pressing the Escape key. ✨

🚀 Technologies Used
HTML5: For the core structure of the web application.

Tailwind CSS: For rapid and responsive UI development, ensuring a modern and clean aesthetic. 🎨

JavaScript (Vanilla JS): The brain behind the app, handling all the dynamic interactions, API calls, and data management. 🧠

TheMealDB API: A free and open API providing a vast database of recipes and meal information. 🌐

Font Awesome: For crisp and functional icons (like search, heart, and close buttons). ✨

💻 How to Use
To get this project up and running on your local machine:

Clone the Repository:

git clone https://github.com/ahmedfadl156/Chefpal_website.git
cd Chefpal_website/public

Open in Browser:

Simply open the index.html file in your web browser.

Recommended (for full localStorage functionality): Use a local HTTP server. If you have Node.js installed, you can do this:

# If not already installed globally
npm install -g http-server
# Then, from within the 'public' directory of your project:
http-server

This will typically serve the app on http://127.0.0.1:8080.

Start Exploring!

Search for your favorite dishes.

Click on recipes to see their details.

Add recipes to your favorites and watch them save!

📂 Project Structure
Chefpal_website/
├── public/
│   ├── index.html          # Main application HTML file
│   ├── style.css           # Tailwind CSS output (or linked via CDN)
│   ├── script.js           # All JavaScript logic for the app
│   ├── images/             # Placeholder for any images (e.g., logo, default)
│   └── leetcode-day1.js    # (Optional) Your LeetCode solution file
├── .gitignore              # Specifies intentionally untracked files to ignore
├── package.json            # Node.js project configuration (if using npm for Tailwind build)
├── tailwind.config.js      # Tailwind CSS configuration (if using npm for Tailwind build)
└── README.md               # This file!

💡 Future Enhancements (Ideas for further development)
User Authentication: Allow users to create accounts and save favorites to a database. 🔐

Recipe Categories/Filters: Implement filtering by cuisine, category, or ingredients. 🍜

Meal Planning: Add functionality to create and save weekly meal plans. 📅

Shopping List Generator: Automatically generate a shopping list from selected recipes. 🛒

Recipe Submission: Allow users to submit their own recipes. ➕

Improved UI/UX: More advanced animations, loading spinners, and error messages. ✨

👨‍💻 Author
Ahmed Fadl

GitHub Profile 🐙

Happy Cooking! 🍳
