# Lost and Found

Lost and Found is an application made for missing and found pets. Users with accounts are also allowed to create pet profiles and perform other tasks.

🛠 Created with PERN stack, JavaScript, TypeScript, Sequelize, Mapbox and custom UI. Unit tests made with Jest (in progress).

![Registration](https://raw.githubusercontent.com/lilla-nemeth/lost-and-found/main/client/src/assets/images/screenshots/app_screenshot_00.png)

## Features

- Registration
- Login/Log out
- Fetch all lost and found pets
- Search pet from all pets (basic)
- Uploading image
- Searching pet location with Mapbox map and using its Geocoding API
- Reporting missing/found pet with required and optional data
- Deleting own pet profiles (all and one by one)

## Future of the App

- Pet and user profile updates
- Filters for listed pets (e.g by creation date, species)
- Stricter image uploading
- Creating unit tests (client side)
- Transitioning to TypeScript (client side)
- Other technical improvements

## Installation, running the app locally

Clone the repo

```
git clone https://github.com/lilla-nemeth/lost-and-found.git
```

### Server

Go to the server folder

```
cd server
```

Install the dependencies

```
yarn install
```

Run the server

```
yarn start
```

Server is running on port 8080

### Client

Go to the client folder

```
cd client
```

Install the dependencies

```
npm install
```

Start the client

```
npm start
```

## Environment Variables

To run this app, create a .env file in the root folders of server and client and add the following environment variables

### Server

#### Mapbox API Key

`API_KEY`

#### Postgres

`PG_HOST`
`PG_USER`
`PG_PASSWORD`
`PG_PORT`
`PG_DATABASE`

#### Node Environment

Currently the app is not in production, but in that case this variable would be necessary

`NODE_ENV`

### Client

#### Mapbox API Key

`REACT_APP_MAPBOX_API_KEY`

## Running unit tests

### Server

Running all tests:

```
yarn run test
```

or

```
yarn run test:watchAll
```

Run tests in one file, example:

```
yarn run test server/src/tests/controllers/userControllers.test.ts
```

## License

MIT
