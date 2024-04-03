# Lost and Found

Lost and Found is an application made for missing and found pets. Users with accounts are also allowed to create pet profiles and perform other tasks.

🛠 Created with PERN stack, JavaScript, TypeScript, Sequelize, Mapbox and custom UI. Unit tests made with Jest.

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

## Installation

Clone the repository

```
git clone https://github.com/lilla-nemeth/lost-and-found.git
```

Server

Go to the server folder

```
cd server
```

Install the dependencies and run the server

```
yarn install
yarn start
```

Client

Go to the client folder

```
cd client
```

Install the dependencies and run the client

```
yarn install
yarn start
```

### Docker

Latest Docker images are available in Github Container Registry (Packages), but they can be built either separately or all of them with docker-compose.

One by one

```
cd server
docker build -t lost-and-found/server:1.0 .
```

```
cd client
docker build -t lost-and-found/client:1.0 .
```

With docker-compose

```
docker-compose build
docker-compose up
```

## Environment Variables

Create .env files in the following folders to make environment variables available.

### Main Root Folder

For docker-compose
`PG_PASSWORD`
`PG_DATABASE`

### Server

Mapbox API Key

`API_KEY`

Postgres

`PG_HOST`
`PG_USER`
`PG_PASSWORD`
`PG_PORT`
`PG_DATABASE`

### Client

Mapbox API Key

`REACT_APP_MAPBOX_API_KEY`

## Running unit tests

Server

Running all tests

```
yarn run test
```

or

Run tests in one file, example:

```
yarn run test server/src/tests/controllers/userControllers.test.ts
```

## License

MIT
