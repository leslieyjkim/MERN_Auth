# Authentication System using MERN 
Welcome to the Authentication System, a robust and modern authentication solution designed to meet the essential security and usability requirements of today's web applications. This project incorporates all the key features necessary to deliver a seamless and secure user experience.


## LIVE DEMO
[Main page - Click me](https://youtu.be/36OuuomVFKo)

## This is how to make a user authentication system using MERN stack. 
- MongoDB(database)
- Express.js(backend framework)
- React.js(frontend library using SPA(single page applications))
- Node.js(backend JS runtime environment)

## Feature
This authentication project will cover all the essential features you would expect in modern web applications including ;
- user registration : Users can sign up easily, and a warm welcome email is sent directly to their registered email address upon successful registration.
- user login & logout : Secure and reliable login/logout functionality, ensuring user sessions are managed effectively.
- email verification : Users are required to verify their email address to activate their account, adding an extra layer of security.
- password reset : A secure and user-friendly password reset feature using a six-digit One-Time Password (OTP), sent directly to the user's email.


* This authentication project is built with best practices in mind to provide an excellent foundation for web applications. Whether you're building a personal project or a professional-grade application, this system is designed to simplify the authentication process while maintaining security and scalability.

Feel free to clone this repository and explore the code to see how these features are implemented! 🚀

## server folder_terminal setup
- npm init
- npm i express cors dotenv nodemon jsonwebtoken mongoose bcryptjs nodemailer cookie-parser
- start : npm run server (after setup 'nodemon' in package.json)

### Here's a breakdown of what each of these packages typically does:

- express: Fast, unopinionated, minimalist web framework for Node.js.
- cors: Middleware to enable Cross-Origin Resource Sharing (CORS) for your Express server.
- dotenv: Loads environment variables from a .env file into process.env.
- nodemon: Utility that automatically restarts your Node.js application when file changes are detected.
- jsonwebtoken: JSON Web Token implementation for Node.js to handle authentication tokens.
- mongoose: Elegant MongoDB object modeling for Node.js (ODM - Object Data Modeling).
- bcryptjs: Library to hash passwords securely.
- nodemailer: Node.js module for sending emails.
- cookie-parser: Middleware to parse cookies in incoming requests.

### Welcome email to new user : using 'Nodemailer' and 'Brevo.com'


## client folder setup (react application)
- npm create vite@latest 
- npm install
- npm install axios react-router-dom react-toastify
- npm run dev

## Install Tailwind CSS with Vite
- https://tailwindcss.com/docs/guides/vite
- npm install -D tailwindcss postcss autoprefixer
- npx tailwindcss init -p

## Tailwind customize colour 
- https://tailwindcss.com/docs/customizing-colors

## react toastify
- https://www.npmjs.com/package/react-toastify

## email template
- https://stripo.email/templates/?utm_campaign=21894853599&utm_content=170383678236&utm_source=google&utm_medium=cpc&utm_term=html%20email%20template&fpr=stripo-ppc&fp_sid=21894853599&gad_source=1&gclid=Cj0KCQiA7se8BhCAARIsAKnF3rx4kfOztTFDoUCoAU8QW8lGAg4yHps3WRMfSXnD6RilTQhmQLhj3t8aAm3bEALw_wcB

