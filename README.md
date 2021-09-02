# Group Assignment in React - The Lazy Bee evening brunch restaurant

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Description of the project

_In this React project we did offical website in both desktop and mobile screen for The Lazy Bee restaurant. All pages contain header with spinning logo of The Lazy Bee restaurant, as well as footer with information about restaurants place, open hours and contact number. This website starts with landingpage where you can find links for menu and table resarvation. Menu leads you to information of what food restaurants serves where you can as well find a link to table booking. Table booking starts with guest being able to choose how many people are visiting restaurant as well as date and time of the booking. Guest can continue to page where he can enter his contact information and confirm booking after which he will recive confirmation mail. In confirmation mail the guest will recive link to cancel booking if wished. Administrative route is available for restaurant to make cancelations and changes to existing bookings._

## Installation instructions

Create a new folder

1. Navigate to the directory where you want to put your repository,
2. Run `git clone https://github.com/SuzanaRistic/RestaurangBokning.git`
3. Run `npm install` to install node modules

## Naming conventions

_Below you'll find a brief summary of the naming conventions for this project_

### Variables

- Use let or const instead of var
- When naming variables use **camelCase**
  - Eg. `let userName = User`
- When naming Mongoose schemas use **PascalCase**
  - Eg. `const User = mongoose.model("user", userSchema)`

### CSS/SCSS namning conventions

- When naming variables use **kebab-case**
  - Eg. `$bg-color: grey`
- When naming classes and id:s use **kebab-case**

### Functions

- When writing functions write `function functionName(example){example}`
- Function names should be in **camelCase**

## Project structure

- ProjectFolder/ contains the following folders and files:\_
  ```
  ├── public/         # is placed directly in the root directory
  |   ├── index.html   # this file contains the html for the whole project
  ├── server/         # is placed directly in the root directory
  |   ├── models/         # schemas are placed in the models folder
  |   ├── routes/         # routes to database is placed in the routes folder
  |   ├── server.js       # this file contains connection to database
  ├── src/             # This folder contains all components for the project as
  |                       the following folders:
  |   ├── images/         # images are placed here
  |   ├── interfaces/     # this folder contains all interfaces
  |   ├── styles          # this folder contains SCSS files
  └──  .env           # config.js is placed in the root directory with important
                        keys. Make sure to replace these with your own keys.
  ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `starting server`

To start the server run
`nodemon server/server`  
in the terminal.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Contact

Email:
suzana.ristic@medieinstitutet.se
melina.kamyab@medieinstitutet.se
marta.ballardini@medieinstitutet.se
