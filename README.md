# Connect Vibes UI

This is social media application build using the MERN stack (MongoDB, Express, React, Node.js). The application should allow users to post updates, view updates from others, and like or comment on posts. The focus should be on building a real-time, interactive feed.

# Pre-requisites

Install Node.js version 20.17.0

# Getting started

- Clone the repository
  git clone https://github.com/GlobalTech4u/connect-vibes-ui.git

- Navigate to folder
  Example - cd connect-vibes-ui

- Install all dependencies
  npm install

- Create .env.local file
  Copy the .env.sample (Path to .env.sample file - connect-vibes-ui\samples\.env.sample) file and paste in environments folder (Path to create file - connect-vibes-ui\environments\.env.local)
  Now rename the .env.sample file to .env.local

- Contents of .env file
  REACT_APP_BASE_API_URL=http://localhost:8080

- Run react-app locally
  npm run start:local

- Build react-app locally
  npm run build:local

# Testing

The tests are written in Mocha and the assertions done using jest

"redux-mock-store": "^1.5.5",
"axios-mock-adapter": "^2.1.0",
"@testing-library/jest-dom": "^5.17.0",
"@testing-library/react": "^15.0.6",
"@testing-library/user-event": "^13.5.0",

- Running tests using NPM Scripts
  npm run test

- Running test coverage using NPM Scripts
  npm run test:coverage
