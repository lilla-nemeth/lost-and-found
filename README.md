# Lost and Found

Lost and Found is an application, where everyone can search from missing pets. Registrated users are also allowed to create pet profiles and perform other tasks. 

🛠 Created with Node.js, Express, PostgreSQL, JavaScript, Mapbox and React with custom UI.

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
Server is running on port 3003

### Client

Go to the frontend folder
```
cd frontend
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

To run this app, you need to add the following environment variables to your .env file

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

## Screenshots

![Registration](https://raw.githubusercontent.com/lilla-nemeth/lost-and-found/adding-screenshots-to-the-readme/frontend/src/assets/images/screenshots/app_screenshot_00.png)

![Report Pet](https://raw.githubusercontent.com/lilla-nemeth/lost-and-found/main/frontend/src/assets/images/screenshots/app_screenshot_01.png)

![Pet Profile](https://raw.githubusercontent.com/lilla-nemeth/lost-and-found/main/frontend/src/assets/images/screenshots/app_screenshot_04.png)

![Pet List](https://raw.githubusercontent.com/lilla-nemeth/lost-and-found/main/frontend/src/assets/images/screenshots/app_screenshot_04.png)