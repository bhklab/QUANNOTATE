# Q-Annotate Web Application

## Setup Instructions

- Clone the repo

```bash
git clone git@github.com:bhklab/LabelIt2.git
cd Q-Annotate
```

- In the project directory, install all server dependencies `npm i`
- In the client directory, install all client dependencies `npm i`
- Create .env using .env.example as a reference to access MongoDB database
- Start the server by running `npm start` or `npm run devstart`(development mode) command
- Start the client (development mode) by running `npm run client` (from project directory)
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Dependencies

- React
- React-Router
- Express
- Mongoose
- Body-parser

## Dev Dependenices

- Nodemon
- Eslint

## Database seeding

- Create seeding files by running respective scripts in the scripts folder
- Make sure to have a correct MONGODB_URL connection string in the .env file
- Run `npx seedgoose unseed`/`npx seedgoose seed` to unseed/seed the database
