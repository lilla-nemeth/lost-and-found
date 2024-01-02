# Lost and Found

Lost and Found is an application, where everyone can search from missing pets. Registrated users are also allowed to create pet profiles and perform other tasks. Created with Node.js, Express, PostgreSQL, JavaScript, Mapbox and React with custom UI.

## Features

### Main
- Registration
- Login/Log out

### For all users
- Fetch all lost and found pets
- Search pet from all pets

### Pet profile creation for registrated users
- Uploading image
- Searching pet location with Mapbox map and its Geocoding API
- Form submission (pet report) with required and optional data

### Dashboard for registrated users
- Deleting own pet profiles (all and one by one)

## Future of the project

### Dashboard
- Updating pet profiles - "reunited" pet category
- User profile with picture uploading

### Other
- Incorporating already written search queries

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
</br></br>
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

## License

MIT
