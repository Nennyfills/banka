<!DOCTYPE html>
    <html>
    <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
        <title>Banka</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.10.0/dist/katex.min.css" integrity="sha384-9eLZqc9ds8eNjO3TmqPeYcDj8n+Qfa4nuSiGYa6DjLNcv9BtN69ZIulL9+8CqC9Y" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/markdown.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Microsoft/vscode/extensions/markdown-language-features/media/highlight.css">
        <link href="https://cdn.jsdelivr.net/npm/katex-copytex@latest/dist/katex-copytex.min.css" rel="stylesheet" type="text/css">
        <style>
.task-list-item { list-style-type: none; } .task-list-item-checkbox { margin-left: -20px; vertical-align: middle; }
</style>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI', 'Ubuntu', 'Droid Sans', sans-serif;
                font-size: 14px;
                line-height: 1.6;
            }
        </style>
        
        <script src="https://cdn.jsdelivr.net/npm/katex-copytex@latest/dist/katex-copytex.min.js"></script>
    </head>
    <body>
        <p><a href="https://travis-ci.org/Nennyfills/banka"><img src="https://travis-ci.org/Nennyfills/banka.svg?branch=develop" alt="Build Status"></a>
<a href="https://coveralls.io/github/Nennyfills/banka?branch=develop"><img src="https://coveralls.io/repos/github/Nennyfills/banka/badge.svg?branch=develop&amp;service=github" alt="Coverage Status"></a>
<a href="https://codeclimate.com/github/Nennyfills/banka/maintainability"><img src="https://api.codeclimate.com/v1/badges/5ff27e94e53e0f0c3fd7/maintainability" alt="Maintainability"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a></p>
<h1 id="banka">Banka</h1>
<pre><code><div>Banka is a light-weight financial system that was bulit from the scrtach with vanilla 
JavaScript on the frontend which is also powered by Express server at the backend side.
this light-weight system allows a client to create their own account and also view their
transaction whenever they want but must visit a branch to withdraw or make any deposit.
</div></code></pre>
<h2 id="website">Website</h2>
<p><a href="https://github.com/Nennyfills/banka.git">https://github.com/Nennyfills/banka.git</a></p>
<h2 id="table-of-contents">Table of Contents</h2>
<ul>
<li>Hosted App</li>
<li>Pivotal Tracker Board</li>
<li>API Documentation</li>
<li>Built With</li>
<li>Getting Started</li>
<li>Application Features</li>
<li>Installation</li>
<li>Running Tests</li>
<li>Deployment</li>
<li>API endpoints</li>
<li>License</li>
<li>Author</li>
<li>Acknowledgments</li>
</ul>
<h1 id="links">Links</h1>
<p>UI Template for the application can be found here Github<a href="https://nennyfills.github.io/banka/">pages</a>.</p>
<p>Pivotal Tracker Stories can found here Pivotal <a href="https://www.pivotaltracker.com/n/projects/2320187">tracker</a></p>
<p>Application was deployed to Heroku. Use public URL with API <a href="https://banka-nenny.herokuapp.com/">endpoints</a>.</p>
<p>API Documenttion was generated with <a href="">swagger</a>.</p>
<h1 id="technologies">Technologies</h1>
<ul>
<li>Node.js A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.</li>
<li>Express.js - Web application framework based on Node.js.</li>
<li>ESLint - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.</li>
<li>Airbnb style guide was followed.</li>
</ul>
<h1 id="tools">Tools</h1>
<p>Postman is the only complete API development environment, and flexibly integrates with the software development cycle.</p>
<h2 id="testing">Testing</h2>
<ul>
<li>Mocha A javascript testing framework.</li>
<li>Chai A test assertion library for Javascript.</li>
<li>Swagger is an open-source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume</li>
</ul>
<h2 id="restful-web-services">RESTful Web services</h2>
<ul>
<li>Pivotal Tracker is the agile project management tool of choice for developers around the world for real-time collaboration around a shared, * prioritized backlog.</li>
<li>Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.</li>
<li>Travis CI is a hosted, distributed continuous integration service used to build and test software projects hosted at GitHub.</li>
<li>Coveralls consolidates the results from a suite of static analysis tools into a single, real-time report, giving your team the information it  needs to identify hotspots, evaluate new approaches, and improve code quality(from crunch base).</li>
</ul>
<h2 id="installations">Installations</h2>
<p>Getting started
You need to have Node and NPM installed on your system.
Installing Node automatically comes with npm.
Clone
Clone this project to your local machine
Installing the project dependencies
Run the command below</p>
<p>$ npm install or npm i
will Start your node server
and run the command below</p>
<h3 id="description">Description</h3>
<pre><code><div>To run Banka you have to install Node.js and NPM packages. The application backend was written in ES2015 note that babel is highly recommended for the application to function. specially [@babel/cli&quot;: &quot;^7.4.3&quot;,
@babel/core: &quot;^7.4.3&quot;, @babel/node: &quot;^7.2.2&quot;].
</div></code></pre>
<h2 id="ui-page-templates">UI Page Templates</h2>
<pre><code><div>Signing up
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

</div></code></pre>
<h2 id="application-features">Application Features</h2>
<p>/**
User can registration on the application
User can create bank account
User can make deposits and withdrawals
Bank account management **/</p>
<h2 id="endpoints">Endpoints</h2>
<p>/***</p>
<table class="tg">
  <tr>
    <th class="tg-yw4l"><b>Name</b></th>
    <th class="tg-yw4l"><b>Endpoints</b></th>
    <th class="tg-yw4l"><b>Fruits</b></th>
  </tr>
  <tr>
    <td class="tg-yw4l">User can sign up</td>
    <td class="tg-yw4l">"/auth/signup"</td>
    <td class="tg-yw4l">Post</td>
  </tr>
  <tr>
    <td class="tg-yw4l"> create admin and staff</td>
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
    <td class="tg-yw4l">/:accountnumber/credit" </td>
    <td class="tg-yw4l">Post</td>
  </tr>
    <tr>
    <td class="tg-yw4l">debit</td>
    <td class="tg-yw4l">?:accountnumber/debit</td>
    <td class="tg-yw4l">Post</td>
  </tr>
    <td class="tg-yw4l">account date</td>
    <td class="tg-yw4l">"/accounts?startDate&endDate"</td>
    <td class="tg-yw4l">get</td>
  </tr>
   <tr>
    <td class="tg-yw4l">account  by status</td>
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
    <td class="tg-yw4l"> account by email</td>
    <td class="tg-yw4l">"/user/:email/accounts"</td>
    <td class="tg-yw4l">get</td>
  </tr>
    <tr>
    <td class="tg-yw4l">transactions by account number</td>
    <td class="tg-yw4l">"/:accountnumber/transactions"</td>
    <td class="tg-yw4l">get</td>
  </tr>
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
</table>
***/
<p>Give the example
Request body</p>
<pre><code><div>{
	&quot;email&quot;: &quot;joy@westlfe.com&quot;,
	&quot;password&quot;: &quot;love&quot;
}
</div></code></pre>
<p>Response body</p>
<pre><code><div>{
    &quot;status&quot;: 200,
    &quot;message&quot;: &quot;Login successful&quot;,
    &quot;token&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5h&quot;
}
</div></code></pre>
<p>Test</p>
<pre><code><div>npm run test or npm run test

</div></code></pre>
<p>Authors</p>
<pre><code><div>Dike Chinenye 
</div></code></pre>
<p>License</p>
<pre><code><div>This project is license under the MIT license

</div></code></pre>

    </body>
    </html>