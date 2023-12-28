# MERAKAL_AS

<!-- ABOUT THE PROJECT -->

# About The Project

```sh
curl -X POST -L 'https://service-api-endpoint-you-develop.dev/?endpoint=https://test-site.com/api/send-email&delay=1000&method=POST' \

  -H 'Authorization: <insert-api-key>’ \

  -H 'Content-Type: application/json' \

  -d '{"hello":"world"}'
```

What should the service do

1. Accept an endpoint, data, delay and method (HTTP method), see url params above

2. Use api key to authorise the request of Create the task

3. When the task is received, records it with status “queued”

4. Executes the task i.e. send request to the endpoint specified, after the specified delay

4a. If the delay is not specified, execute instantly. If 200 OK not received mark as "failed"

4. On execution, marks the task as “complete”

Endpoints

- Get a list of tasks for a bearer token

- Get a list of complete/queued tasks with status

<!-- GETTING STARTED -->

# Getting Started

Clone the Github Repo and follow these steps.

## Prerequisites

npm is needed to run the software and node(download from official website).

Run below code in your CMD or in VS code CMD

- npm
  ```sh
  npm install npm@latest -g
  ```

### ENV

Below is the .env file

```sh
# Change the below Credentials as needed

# Database credentials (These are for the local machine, you will need postgre sql to run locally, generate your own to run locally)
DB_HOST = "localhost"
DB_PORT = 5432
DB_USERNAME = "nitish"
DB_PASS = "nitishadmin"
DB_NAME = "merakal"

# API Key (Used to Authenticate the Create Task API)
VALID_API_KEY = "b2beba53-31aa-442f-b7c3-08120be5eb52"

# Secret Key (Used generate Authorization Token)
JWT_SECRET_KEY = "mera kal"
TOKEN_EXPIRY = "1d"

# User (For Log In)
USER_USERNAME = "nitish"
USER_PASS = "nitish123"

# Port number
PORT = 3000

# Node version
NODE_VERSION = 20.10.0

# Node env
NODE_ENV = "development"
```

1. cd into the MERAKAL_AS

```sh
  cd .\MERAKAL_AS\
```

2. Install NPM packages

```sh
npm install
```

3. Now run the below command to run the server and server will be running on localhost:3000

3.1. Use this code if you want to run it using nodemon

```sh
npm run dev
```

3.2. Use this code if you want to run it using node

```sh
npm run start
```

5. Your Server would be running on

```
http://localhost:3000
```

6. To stop the server just `ctrl + c` in your terminal.

## Usage Intsructions

1. Endpoint

   - `/` - To create a Task
     Method : POST

2. Endpoint

   - `/auth/login` - To Log in and get the token (username and password is in .env file and mentioned in the Postman)
     Method : POST

3. Endpoint

   - `/tasks/` - To Get the Tasks (it needs the Token, In postman it is taken care of, when you log in it the token will automatically be stored as a global variable)
     Method : GET

4. Endpoint
   - `/tasks/:status` - To Get the tasks based on status (not required any authentication)
     Method : GET

<!-- Postman -->

<h4>Note :</h4>
<p>In postman there is a variable live_url that has the hosted service url. It might take sometime because the <strong>render stops the server due to inactivity</strong></p>

## Postman

Postman Invite Link : [POSTMAN Invite Link](https://app.getpostman.com/join-team?invite_code=b06f77f0106ccf7a206d302c1f2eb1a4&target_code=306298d2d0b005e2ece2b60c48e27291)

It is a public workspace that you can visit, Join it and test the API's
