[![Build Status](https://travis-ci.org/Nennyfills/banka.svg?branch=develop)](https://travis-ci.org/Nennyfills/banka)
[![Coverage Status](https://coveralls.io/repos/github/Nennyfills/banka/badge.svg?branch=develop&service=github)](https://coveralls.io/github/Nennyfills/banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ff27e94e53e0f0c3fd7/maintainability)](https://codeclimate.com/github/Nennyfills/banka/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Banka 
````
Banka is a light-weight financial system that allows the client to create their account view 
their transaction whenever theywant but must visit a branch to withdraw or make any deposit.
````
Getting Started
````
You will need to clone the projct cd into it and run npm run div. This will start the application.
````

Requirements
```
Banka application was bulit from the scrtach with vanilla JavaScript on the frontend which is also
powered by Express server at the backend side.
```
Description
````
To run Banka you have to install Node.js and NPM packages. The application backend was written in
ES2015 note that babel is highly recomened for the application to function. specially 
[@babel/cli": "^7.4.3",@babel/core: "^7.4.3", @babel/node: "^7.2.2"].
````
Demo login for UI
````
Admin
username: admin
password:admin

Staff
username: staff
password:staff

User
username: user
password:user

````
Installing
````
Copy the clone link on my github Banka repo
Go to your terminal clone it with link above
install your NPM packages
start your server
Example below:
https://github.com/Nennyfills/banka.git
npm install
npm run dev
````

Features
```
router.post("/auth/signup");
router.post("/auth/account");
router.post("/auth/login");
router.post("/account");
router.get("/:accountnumber/transaction");
router.patch("/:accountnumber");
router.post("/:accountnumber/credit");
router.post("/:accountnumber/debit");
router.delete("/accounts/:accountnumber");
router.get("/:accountnumber/profile");
router.get("/accounts");
```

Give the example
Request body
```
{
	"email": "joy@westlfe.com",
	"password": "love"
}
```
Response body
```
{
    "status": 200,
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpveUB3ZXN0bGlm
    ZS5jb20iLCJ1c2VySWQiOjEwMDAwMDEsImlhdCI6MTU1NTU0OTUzNCwiZXhwIjoxNTU2MTU0MzM0
    fQ.-0MzGYjLBPkaOZVkeS0lRpCwGk_l78VIIxf84MdRMdc"
}
```
Test
```
npm run test or npm test

```

Authors
```
Dike Chinenye 
```

License
```
This project is license under the MIT license

```



