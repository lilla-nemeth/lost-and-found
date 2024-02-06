# Lost and Found

Lost and Found is an application, where everyone can search from missing pets. Registrated users are also allowed to create pet profiles and perform other tasks.

🛠 Created with Node.js, Express, PostgreSQL, JavaScript, Mapbox and React with custom UI.

![Registration](https://raw.githubusercontent.com/lilla-nemeth/lost-and-found/dbab47a1f3516893ec324a86fd9e7550202a1407/client/src/assets/images/screenshots/app_screenshot_00.png)

## Features

- Registration
- Login/Log out
- Fetch all lost and found pets
- Search pet from all pets
- Uploading image
- Searching pet location with Mapbox map and its Geocoding API
- Form submission (pet report) with required and optional data
- Deleting own pet profiles (all and one by one)

## Installing, running locally

Clone the repo

```
git clone https://github.com/lilla-nemeth/lost-and-found.git
```

### Server

Go to the project root directory

```
cd lost-and-found
```

Install the dependencies

```
npm install
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
