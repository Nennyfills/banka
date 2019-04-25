[![Build Status](https://travis-ci.org/Nennyfills/banka.svg?branch=develop)](https://travis-ci.org/Nennyfills/banka)
[![Coverage Status](https://coveralls.io/repos/github/Nennyfills/banka/badge.svg?branch=develop&service=github)](https://coveralls.io/github/Nennyfills/banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ff27e94e53e0f0c3fd7/maintainability)](https://codeclimate.com/github/Nennyfills/banka/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Banka 
````
Banka is a light-weight financial system that was bulit from the scrtach with vanilla 
JavaScript on the frontend which is also powered by Express server at the backend side.
this light-weight system allows a client to create their own account and also view their
transaction whenever they want but must visit a branch to withdraw or make any deposit.
````
## Website
[https://github.com/Nennyfills/banka.git](https://github.com/Nennyfills/banka.git)

## Table of Contents
* Hosted App
* Pivotal Tracker Board
<!-- * API Documentation -->
* Built With
* Getting Started
* Application Features
* Installation
* Running Tests
* Deployment
* API endpoints
* License
* Author
* Acknowledgments
  
## Hosted App
[https://banka-nenny.herokuapp.com/](https://banka-nenny.herokuapp.com/)


## Pivotal Tracker Board
[https://www.pivotaltracker.com/n/projects/2320187](https://www.pivotaltracker.com/n/projects/2320187)

<!-- ## API Documentation -->

## UI Page Templates
```
Signing up
Login
create Bank account 
create profile Picture
Activating / deactivating user accounts
Creating an admin / a staff user account
making transactions (credit / debit)
Viewing a list of all bank accounts
Viewing a specific bank account record
Deleting a specific bank account
Creating a bank account
Viewing bank account profile
Viewing account transaction history

```
## Application Features
User can registration on the application
User can create bank account
User can make deposits and withdrawals
Bank account management

## Built With
* Html
* CSS
* Node.js
* Express
* Postgres

## Getting started
* Clone this repository
   https://github.com/Nennyfills/banka.git

You will need to clone the projct cd into it, do 1npm and run npm run dev. This will start the application.

### Description
````
To run Banka you have to install Node.js and NPM packages. The application backend was written in ES2015 note that babel is highly recommended for the application to function. specially [@babel/cli": "^7.4.3",
@babel/core: "^7.4.3", @babel/node: "^7.2.2"].
````

###  Installing
````
Copy the clone link on my github Banka repo or with link above
Go to your terminal clone it
install your NPM packages
start your server
Example below:
npm install
npm run dev
````

<!-- # API Documentation Page -->

## Endpoints
```
create users router
router.post("/auth/signup");
create admin and staff router
router.post("/auth/portal");
login routers
router.post("/auth/login");
create bank accounts router
router.post("/accounts");
deactivate and active account router
router.patch("/:accountnumber");
credit and debit user account routers
router.post("/:accountnumber/credit");
router.post("/:accountnumber/debit");
delete account router
router.delete("/accounts/:accountnumber");
get all account router
router.get("/accounts");
get all account by status
router.get("/accounts?status");
get all account date
router.get("/accounts?startDate&endDate");
get account by account number
router.get("/accounts/:accountnumber");
account by owner id
router.get("/user/:ownerid/accounts");
get transactions by account number
router.get("/:accountnumber/transactions");
get transactions by id
router.get("/transactions/:transactionId";
get transactions by date
router.get("/transactions?startDate&endDate");
get transactions by email
router.get("/user/:email/accounts");

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
    "token": "eyJhbGciOiJIUzI1NiIsInR5h"
}
```
Test
```
npm run test or npm run test

```

Authors
```
Dike Chinenye 
```

License
```
This project is license under the MIT license

```