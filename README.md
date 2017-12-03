# Token Based Authentication

A token based authentication using JWT

# Getting Started!

  - Clone the repo
  - cd && npm install
  - Run `node ./bin/www`

## Code Overview

### Dependencies
- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [body-parser](https://www.npmjs.com/package/body-parser) - To parse the payload send along the post requests
- [jsonwebtokens](https://www.npmjs.com/package/jsonwebtoken) - JWT library to generate and verify token
- [http-status-codes](https://www.npmjs.com/package/http-status-codes) - Provide list of http codes with text
- [redis](https://www.npmjs.com/package/redis)- node redis client to handle cache operations
 
## Application Structure

- `app.js` - The entry point to our application. This file defines our express server. It also requires the routes we'll be using in the application.
- `lib/` - This folder contains custom library files.
- `util/` - This folder contains custom utility files.
- `routes/` - This folder contains the route definitions for our API.
- `controller/` - This folder contains the controller provided by the API.
- `middleware/` - This folder contain middleware files responsible for handling errors

## Endpoints

#### API: To get the access token

```
    API: /api/token
    Method: POST
    Body: {
       "username",
       "password"
    }
    Response: {
        access_token
    }

````
**OR**

Using Refresh token to get access token

```
    API: /api/token
    Method: POST
    Body: {
       "username",
       "refreshToken"
    }
    Response: {
        access_token
    }

````
#### API: To generate refresh token

```
    API: /api/token/generate
    Method: POST
        Body: {
            username,
            password
        }
        Response: {
            refresh_token: 'randoM_tOKen'
        }

````
#### API: To revoke refresh token

```
    API: /api/token/revoke
    Method: POST
    Body: {
        refreshToken: 'randomTokentoBeReVOkeD'
    }
````
License
----

MIT


**Free Software, Hell Yeah!**