# Lost and Found

Lost and Found is an application made for missing and found pets. Users with accounts are also allowed to create pet profiles and perform other tasks.

🛠 Created with PERN stack, Sequelize, Mapbox and custom UI.

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
- Stricter image uploading
- Filters for listed pets (e.g by creation date, species)
- Technical improvements (e.g unit tests, switching to TypeScript)

## Installing, running locally

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
nodemon index.js
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

To run this app, you need to add the following environment variables to your .env file. Make sure the .env file is visible to sequelize config.js and queries.js files.

### Server

#### Mapbox API Key

`API_KEY`

#### Postgres

`PG_HOST`
`PG_USER`
`PG_PASSWORD`
`PG_PORT`
`PG_DATABASE`

### Client

#### Mapbox API Key

`REACT_APP_MAPBOX_API_KEY`

## License

MIT
