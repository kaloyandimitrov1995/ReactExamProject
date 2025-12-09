Works with Node v22.21.1 on my Windows 11 PC.

RUN COMMAND PROMPT Then:

### TO START THE CLIENT:
```
cd path/to/the/project
cd client
npm install
npm install react-router-dom
npm run dev
```
### TO START THE CLIENT TESTS:
```
cd path/to/the/project
cd client
npm install --save-dev jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react
npm test
```

### TO START THE SOFTUNI PRACTICE SERVER:
```
cd path/to/the/project
cd server
npm install
npm start
```

### EXTRA TIPS:
```
The Application is using the "https://github.com/softuni-practice-server/softuni-practice-server"
So you can log in with the users initialized in the server:
peter@abv.bg : 123456
george@abv.bg : 123456
admin@abv.bg : admin
```