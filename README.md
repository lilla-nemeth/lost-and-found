# Lost and Found

## Description

Lost and Found is an application, where everyone can search from missing pets and registrated users are allowed to upload pet profiles.
It was created with Node.js, Express, PostgreSQL, JavaScript and React with custom UI.

## Features

- Registration
- Login/Log out

For all users:

- Fetch all lost and found pets
- Search from all pets

For logged in users:

- Uploading pet profile with image
- Required and optional data options during uploading
- Dashboard and contact informations of uploaded profiles (phone, email)
- Can delete own pet profiles

## Future of the project

Dashboard:

- Updating pet profiles - "reunited" pet category
- User profile with picture uploading

Other:

- Use the search queries
- Use the mapbox map

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
