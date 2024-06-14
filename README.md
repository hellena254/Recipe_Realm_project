# Recipe Realm

![Recipe Realm Banner](https://www.canva.com/design/DAGGI1rxojo/view) 


## Table of Contents
- [Introduction](#introduction)
- [Inspiration and Purpose](#inspiration-and-purpose)
- [Architecture and Technology](#architecture-and-technology)
- [Core Features](#core-features)
- [Challenges and Solutions](#challenges-and-solutions)
- [Future Enhancements](#future-enhancements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Related Projects](#related-projects)
- [Licensing](#licensing)


## Introduction

Welcome to Recipe Realm, a platform dedicated to food enthusiasts who love to discover, share, and create delicious recipes from around the world. Whether you're a seasoned chef or an amateur cook, Recipe Realm offers a diverse collection of recipes to explore.

- **Final Project Blog Article:** [Read the Blog](https://medium.com/@atienohellen125/exploring-recipe-realm-building-a-culinary-adventure-with-express-js-mongodb-and-react-0c0776e20346)
- **Author LinkedIn:** [Hellena](https://www.linkedin.com/in/hellen-atieno-0635b1190/)

  
## Inspiration and Purpose

The inspiration for Recipe Realm came from my lifelong passion for cooking and sharing culinary experiences. Growing up, I spent countless hours in the kitchen experimenting with recipes and flavors. This project was born out of a desire to create a platform where food enthusiasts like myself could easily discover new recipes, share their own creations, and connect with a community that shares the same passion.

Building Recipe Realm was more than just a technical challenge; it was a way to bring together a community of like-minded individuals. I aimed to solve the problem of fragmented recipe collections by providing a centralized platform that is both user-friendly and rich in features.

## Architecture and Technology

Recipe Realm is built using a modern tech stack designed to ensure scalability, efficiency, and user satisfaction.

### Technologies Used

- **Frontend:** EJS, HTML5, CSS3
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

### Architecture Diagram

![Architecture Diagram](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Recipe_sharing.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1o65gkTtFlzJIwQMTV9duH88g-racomGy%26export%3Ddownload#%7B%22pageId%22%3A%22e3a06f82-3646-2815-327d-82caf3d4e204%22%7D)

## Core Features

- **Recipe Management:** Users can create, read, update, and delete recipes.
- **User Authentication:** Secure login and registration using JWT.
- **Responsive Design:** The platform is optimized for both web and mobile use.

## Challenges and Solutions

### Technical Challenges

One of the most challenging aspects of this project was implementing secure authentication using JSON Web Tokens (JWT). The main challenge was ensuring the security of user data and maintaining secure API interactions. To tackle this, I thoroughly researched JWT-based authentication, integrated it into the application, and handled token creation, verification, and expiration.

#### Situation

Early in the project, I decided to provide secure user authentication to protect user data and ensure secure access to features like recipe submission and personal recipe management.

#### Task

The task was to implement a robust authentication system using JWT, which involved creating and verifying tokens securely, managing user sessions, and ensuring data protection.

#### Action

I began by researching best practices for JWT implementation. I set up the backend to generate tokens upon successful login and store them securely. For frontend integration, I used React's context API to manage authentication state and protect routes.

#### Result

The JWT-based authentication was successfully implemented, providing secure user login and access control. This not only enhanced data security but also improved the overall user experience by enabling personalized features.

### Non-Technical Challenges

Balancing project development with personal commitments was a significant non-technical challenge. Ensuring consistent progress while managing time effectively required disciplined planning and prioritization.

## Future Enhancements

In future iterations, I plan to:

- Implement user profile management
- Add social media sharing capabilities
- Enhance the search functionality with more advanced filters
- Integrate additional APIs for more diverse recipe sources

## Installation

To get a local copy of Recipe Realm up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hellena254/Recipe_Realm_project
   cd recipe-realm
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

6. **Visit the application:**
   Open your browser and navigate to `http://localhost:5500`.

## Usage

Once the application is up and running, you can:

- **Explore Recipes:** Browse through a variety of popular recipes on the home page.
- **Submit Your Recipe:** Share your favorite recipes with the community by filling out the submission form.
- **View Recipe Details:** Click on any recipe card to view detailed instructions, ingredients, and nutritional information.


## Contributing

Contributions are welcome! If you'd like to contribute to Recipe Realm, please follow these steps:


## Related Projects

Check out these related projects that inspired Recipe Realm:

- [Tasty](https://tasty.co/)
- [Epicurious](https://www.epicurious.com/)
- [Food Network](https://www.foodnetwork.com/)

## Licensing

Recipe Realm is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.


