# FAKE-API

![Alt text](documentation/logo.png?raw=true "FAKE-API")

[![Maintainability](https://api.codeclimate.com/v1/badges/55bbff204f62104c7c8d/maintainability)](https://codeclimate.com/github/JustalK/SERVER-API/maintainability)

This project is a complete `GraphQL` and `Rest` Crud API for managing posts. The documentation is exhaustive and has been done with `graphql-voyager`, `swagger` and `jsdoc`. Feel free to play with it for your different projects.


- **REST**: [https://labo-test-api.herokuapp.com/api/rest](https://labo-test-api.herokuapp.com/api/rest)
- **GRAPHQL**: [https://labo-test-api.herokuapp.com/api/graphql](https://labo-test-api.herokuapp.com/api/graphql)

**Example**
<pre>
 <code>
  // Get only one post and skip the 2 first
  <a href="https://labo-test-api.herokuapp.com/post?limit=1&skip=2">https://labo-test-api.herokuapp.com/post?limit=1&skip=2</a>

  // Get all port sorted by title ascending
  <a href="https://labo-test-api.herokuapp.com/post?order=asc&sort=title">https://labo-test-api.herokuapp.com/post?order=asc&sort=title</a>
 </code>
</pre>

## Plan of the presentation

I explain with all the details how I build the project and my way of working.

- [Documentation](#documentation)
- [Organization](#organization)
- [Technologies](#technologies)
- [Motivation](#motivation)
- [Development](#development)
- [Seeding](#seeding)
- [Testing](#testing)
- [Monitoring](#monitoring)
- [Security](#security)
- [Running](#running)
- [Links](#links)

## Documentation

#### Readme documentation

The documentation of the server can be access at this endpoint. It gives information about the server, the tools and how to use the API. Open a browser and go to the following URL :

<pre><code>WEB: <a href="https://labo-test-api.herokuapp.com/documentation">https://labo-test-api.herokuapp.com/documentation</a>
Local: <a href="http://localhost:5000/documentation">http://localhost:5000/documentation</a></code></pre>

#### Api rest documentation

The documentation for the rest version of the API :

<pre><code>WEB: <a href="https://labo-test-api.herokuapp.com/api/rest">https://labo-test-api.herokuapp.com/api/rest</a>
Local: <a href="http://localhost:5000/api/rest">http://localhost:5000/api/rest</a></code></pre>

#### Api graphql documentation

The documentation for the graphql version of the API :

<pre><code>WEB: <a href="https://labo-test-api.herokuapp.com/api/graphql">https://labo-test-api.herokuapp.com/api/graphql</a>
Local: <a href="http://localhost:5000/api/graphql">http://localhost:5000/api/graphql</a></code></pre>

You can also see the graph with `graphql-voyager`

<pre><code>WEB: <a href="https://labo-test-api.herokuapp.com/erd">https://labo-test-api.herokuapp.com/erd</a>
Local: <a href="http://localhost:5000/erd">http://localhost:5000/erd</a></code></pre>

#### Code documentation

The jsdoc can be generated locally with the following command :

```bash
npm run build:docs
```

#### Local API documentation

Since it's a graphql, anyone can generate the documentation by introspection. I suggest to use this tool `2fd/graphdoc` with the following commands :

```bash
npm install -g @2fd/graphdoc
graphdoc -e http://localhost:5000/api/graphql -o ./doc/schema
```

A html doc will be then found inside the directory **/doc/schema**.

## Organization

#### Organization of the global folder

| Folder's Name  | Description of the folder                               |
| :------------- | :------------------------------------------------------ |
| `documentation`| Everything related to the documentations                |
| `env`          | Regroup the global constant of the app                  |
| `seeding`      | Regroup the seed of the app for populating the database |
| `src`          | Regroup the source code                                 |
| `test`         | Regroup the test                                        |

#### Organization of the src folder

| Folder's Name | Description of the folder                               |
| :------------ | :------------------------------------------------------ |
| `dbs`         | Regroup the direct call to the database                 |
| `libs`        | Regroup the utils and global functions                  |
| `models`      | Regroup the models                                      |
| `routes`      | Regroup the routes for the rest API                     |
| `services`    | Regroup the services of the app                         |
| `types`       | Regroup the types for graphQL                           |

## Development

#### Package explanation

* **apollo-server-express**: Apollo serves as an abstraction layer that decouples services and apps so that each can be developed independently of the other, in any language and on any platform. I use it for managing a graphQl.
* **dotenv**: Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. I use it for creating an environment for the prod, stage, dev and local development.
* **express**: xpress is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. I use it for managing the routes and the API.
* **express-session**: A middleware for managing the session through express. I use it for creating the account of the app.
* **express-status-monitor**: Simple, self-hosted module based on Socket.io and Chart.js to report realtime server metrics for Express-based node servers. I use this for checking the status of the server without connecting to aws.
* **graphQl**: GraphQL is an open-source data query and manipulation language for APIs, and a runtime for fulfilling queries with existing data. I use it because it give more flexibility for the frontend and it optimizes the query way better than REST.
* **graphql-tools**: This package provides a few useful ways to create a GraphQL schema. I use this for creating an introspection of the API and creating thing such as documentation and erd with the schema generated.
* **graphql-voyager**: With graphql-voyager you can visually explore your GraphQL API as an interactive graph. This is a great tool when designing or discussing your data model. I use it for letting people see the erd and the documentation behind the API without doing any effort.
* **helmet**: Helmet helps you secure your Express apps by setting various HTTP headers. I use it for hidding some header and protecting the app against well know weakness of Express.
* **isomorphic-fetch**: The Fetch API is currently not implemented consistently across browsers. This module will enable you to use fetch in your Node code in a cross-browser compliant fashion. I use it for testing the unit test, I call every endpoint with a fetch as any browser will do.
* **marked**: Low-level compiler for parsing markdown without caching or blocking for long periods of time. I use it for reading the content of the Readme and passing it to a webpage. That way the README is readable in a browser through an endpoint.
* **module-alias**: Create aliases of directories and register custom module paths in NodeJS. I use it for avoiding transversal path inside the call, it makes the development way more simpler and cleaner.
* **mongoose**: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. I use it like an ORM and for designing the schema of the app easily.
* **node-cron**: The node-cron module is tiny task scheduler in pure JavaScript for node.js based on GNU crontab. I use it for managing the calls that need to be execute following a schedule.
* **react**: React is a JavaScript library for creating user interfaces. I use it for creating the user interface for the ERD and documentation.
* **react-dom**: This package serves as the entry point to the DOM and server renderers for React. I use it for managing the interaction in the dom for the voyager.
* **winston**: A logger for just about everything. I use it for saving into a log file any interaction in the server.
* **ava**: AVA is a test runner for Node.js with a concise API, detailed error output, embrace of new language features and process isolation that lets you develop with confidence. I use it for managing effiently the test of the app.
* **coveralls**: Coveralls.io support for Node.js. I use it for linking the app to coveralls website and getting the percentage of coverage of the test.
* **eslint**: ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. In many ways, it is similar to JSLint and JSHint with a few exceptions. I use it for fixing the style of the app.
* **faker**: Generate massive amounts of fake data in the browser and node.js I use it inside the test for generating random data, it make the test more powerful.
* **husky**: Husky is a modern native Git hooks. I use it for restricting the commit to the interesting one and for forcing the test to be run before merging anything.
* **jsdoc**: An API documentation generator for JavaScript. I use it for generating the documentation using the comments in the code.
* **npx**: Executes <command> either from a local node_modules/.bin, or from a central cache, installing any packages needed in order for <command> to run. I use it for running package from my local node module directory such as esLint.
* **nyc**: Istanbul's state of the art command line interface. I use it for creating the report for the coverall and making it available in the browser.
* **lowdb**: For managing the database in a json file
* **cors**: For managing the cors on the api REST

## Technologies

The server is using the library `Express` but it can be switch easily in the **server.js** file for Fastify or Restify. The server is linked to the library `Apollo-server` for managing the data with `GraphQL`. The database is handle by `lowdb` and can also be easily switch in **database.js**. The data come from the seed and are populating the db at each restart of the server.

The models are found in the folder **models**. Their schema are described with `mongoose` and also typed for using `GraphQL`.

The continuous integration is handled with `Travis` and the coverage is checked by `Coveralls` and `Codeclimate` for checking the level of maintainability of the code. Finally, I use `Ava` for making the test cases. For fixing the style, I use `Eslint`.

Before committing, `Husky` will force the tests to be run and will validate or not the new push.

#### Pre-commit

`Husky` has been installed and will prevent to push any code that break the project.

## Seeding

For having a database with some data from the start, you can seed it with a single command. It will fill up all the json file with dummy data.

```bash
npm run seed
```

## Testing

For automatic tests, I use `Ava`. All the tests can be run with a single command. The command will also provide details on the coverage.

```bash
npm run test
```

#### SSH Tunneling

For connecting to the API during the development, I use `localtunnel` for exposing the server through a domain format. The server works on the port 5000, so I use the following commands :

```bash
npm install -g localtunnel
lt --port 5000 --subdomain couple-api
```

## Monitoring

The monitoring is enable by default and can be viewed live on the endpoint `/status` :

```
http://localhost:5000/status
```

## Security

#### Helmet

`Helmet` is automatically installed. It will setup the HTTP header of the app aappropriately and will hide some of them for the hacker. Helmet is not perfect but will help with cross-site scripting attack, clickjacking and some others.

## Running

For running the API, a single command is needed. You might want to use the [SSH Tunneling](#ssh-tunneling).

```bash
npm run start
```

## Links

- [https://github.com/typicode/json-server](https://github.com/typicode/json-server)
- [https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do](https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do)
- [https://randomuser.me/](https://randomuser.me/)

## License

MIT - Copyright &copy; [JUSTAL Kevin](https://teamkd.online/)
