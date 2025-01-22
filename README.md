## This is how to make a user authentication system using MERN stack. 
- MongoDB(database)
- Express.js(backend framework)
- React.js(frontend library using SPA(single page applications))
- Node.js(backend JS runtime environment)

This authentication project will cover all the essential features you would expect in modern web applications including ;
- user registration (sending welcome email to user's email) 
- user login & l ogout functionality
- email verification
- password reset feature using a secure six digit OTP sent directly to the user's email. 


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
