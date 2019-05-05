[![Build Status](https://travis-ci.org/Nennyfills/banka.svg?branch=develop)](https://travis-ci.org/Nennyfills/banka)
[![Coverage Status](https://coveralls.io/repos/github/Nennyfills/banka/badge.svg?branch=develop)](https://coveralls.io/github/Nennyfills/banka?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/5ff27e94e53e0f0c3fd7/maintainability)](https://codeclimate.com/github/Nennyfills/banka/maintainability) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Banka

    Banka is a light-weight financial system that was bulit from the scrtach with vanilla JavaScript on the frontend which is
    also powered by Express server at the backend side.this light-weight system allows a client to create their own account and 
    also view theirtransaction whenever they want but must visit a branch to withdraw or make any deposit.

## Website

[https://github.com/Nennyfills/banka.git](https://github.com/Nennyfills/banka.git)

## Table of Contents

*   Hosted App
*   Pivotal Tracker Board
*   API Documentation
*   Built With
*   Getting Started
*   Application Features
*   Installation
*   Running Tests
*   Deployment
*   API endpoints
*   License
*   Author
*   Acknowledgments

# Links

UI Template for the application can be found here Github [pages](https://nennyfills.github.io/banka/).

Pivotal Tracker Stories can found here Pivotal [tracker](https://www.pivotaltracker.com/n/projects/2320187)

Application was deployed to Heroku. Use public URL with API [endpoints](https://banka-nenny.herokuapp.com/).

API Documenttion was generated with <a href="https://app.swaggerhub.com/apis-docs/Nennyfills/banka/1.0.0">swagger</a>.

# Technologies

*   Node.js A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
*   Express.js - Web application framework based on Node.js.
*   ESLint - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
*   Airbnb style guide was followed.

# Tools

Postman is the only complete API development environment, and flexibly integrates with the software development cycle.

## Testing

*   Mocha A javascript testing framework.
*   Chai A test assertion library for Javascript.
*   Swagger is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume

## RESTful Web services

*   Pivotal Tracker is the agile project management tool of choice for developers around the world for real-time collaboration around a shared, * prioritized backlog.
*   Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
*   Travis CI is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.
*   Coveralls consolidates the results from a suite of static analysis tools into a single, real-time report, giving your team the information it needs to identify hotspots, evaluate new approaches, and improve code quality(from crunch base).

## Installations

Getting started You need to have Node and NPM installed on your system. Installing Node automatically comes with npm. Clone Clone this project to your local machine Installing the project dependencies Run the command below

$ npm install or npm i will Start your node server and run the command below

### Description

    To run Banka you have to install Node.js and NPM packages. The application backend was written in ES2015 note that babel is highly recommended for the application to function. specially [@babel/cli": "^7.4.3",
    @babel/core: "^7.4.3", @babel/node: "^7.2.2"].

## UI Page Templates

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

## Application Features

/** User can registration on the application User can create bank account User can make deposits and withdrawals Bank account management **/

## Endpoints

/***

<table class="tg">

<tbody>

<tr>

<th class="tg-yw4l">**Name**</th>

<th class="tg-yw4l">**Endpoints**</th>

<th class="tg-yw4l">**CRUD**</th>

</tr>

<tr>

<td class="tg-yw4l">User can sign up</td>

<td class="tg-yw4l">"/auth/signup"</td>

<td class="tg-yw4l">Post</td>

</tr>

<tr>

<td class="tg-yw4l">create admin and staff</td>

<td class="tg-yw4l">"/auth/portal"</td>

<td class="tg-yw4l">Post</td>

</tr>

<tr>

<td class="tg-yw4l">login</td>

<td class="tg-yw4l">"/auth/login"</td>

<td class="tg-yw4l">Post</td>

</tr>

<tr>

<td class="tg-yw4l">create bank accounts</td>

<td class="tg-yw4l">"/accounts"</td>

<td class="tg-yw4l">Post</td>

</tr>

<tr>

<td class="tg-yw4l">deactivate and active</td>

<td class="tg-yw4l">"/:accountnumber"</td>

<td class="tg-yw4l">Patch</td>

</tr>

<tr>

<td class="tg-yw4l">credit</td>

<td class="tg-yw4l">/:accountnumber/credit"</td>

<td class="tg-yw4l">Post</td>

</tr>

<tr>

<td class="tg-yw4l">debit</td>

<td class="tg-yw4l">?:accountnumber/debit</td>

<td class="tg-yw4l">Post</td>

</tr>

<tr>

<td class="tg-yw4l">account date</td>

<td class="tg-yw4l">"/accounts?startDate&endDate"</td>

<td class="tg-yw4l">get</td>

</tr>

<tr>

<td class="tg-yw4l">account by status</td>

<td class="tg-yw4l">"/accounts?status"</td>

<td class="tg-yw4l">get</td>

</tr>

<tr>

<td class="tg-yw4l">delete account accountnumber</td>

<td class="tg-yw4l">"/accounts/:accountnumber"</td>

<td class="tg-yw4l">Delete</td>

</tr>

<tr>

<td class="tg-yw4l">account by owner id</td>

<td class="tg-yw4l">"/user/:ownerid/accounts"</td>

<td class="tg-yw4l">get</td>

</tr>
<tr>

<td class="tg-yw4l">acconut by accountumber</td>

<td class="tg-yw4l">"/accounts/:accountnumber"</td>

<td class="tg-yw4l">get</td>

</tr>

<tr>

<td class="tg-yw4l">account by email</td>

<td class="tg-yw4l">"/user/:email/accounts"</td>

<td class="tg-yw4l">get</td>

</tr>

<tr>

<td class="tg-yw4l">transactions by account number</td>

<td class="tg-yw4l">"/:accountnumber/transactions"</td>

<td class="tg-yw4l">get</td>

</tr>

<tr>

<td class="tg-yw4l">transactions by id</td>

<td class="tg-yw4l">"/transactions/:transactionId"</td>

<td class="tg-yw4l">get</td>

</tr>

<tr>

<td class="tg-yw4l">upload profile picture</td>

<td class="tg-yw4l">"/profileimage/save"</td>

<td class="tg-yw4l">Put</td>

</tr>

<tr>

<td class="tg-yw4l">reset password</td>

<td class="tg-yw4l">"/resetpassword"</td>

<td class="tg-yw4l">Post</td>

</tr>

</tbody>

</table>

***/

Give the example Request body

    {
    	"email": "joy@westlfe.com",
    	"password": "love"
    }

Response body

    {
        "status": 200,
        "message": "Login successful",
        "token": "eyJhbGciOiJIUzI1NiIsInR5h"
    }

Test

    npm run test or npm run test

Authors

    Dike Chinenye 

License

    This project is license under the MIT license
