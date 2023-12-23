const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const { 
  authMw, 
  isFormValid, 
  upload 
} = require('./middlewares.js');

const {     
  SELECT_PETS_BY_DESC_DATE,
  SELECT_PETS_BY_PAGINATION,
  SELECT_TOTAL_NUM_OF_PETS,
  SELECT_PET_BY_ID,
  SELECT_ALL_USERS,
  SELECT_USER_BY_ID,
  SELECT_PETS_BY_USER,
  SELECT_USER_BY_EMAIL,
  UPDATE_PET,
  UPDATE_USER,
  DELETE_ALL_PETS,
  DELETE_PET_BY_ID,
  DELETE_PET_BY_USER,
  DELETE_USER_BY_ID,
  INSERT_PET_VALUES,
  INSERT_USER_VALUES
} = require('./queries.js');

let DEBUG = false;

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3003;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
}

const devSettings = {
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

const prodSettings = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: process.env.NODE_ENV === 'production' ? false : true,
    // rejectUnauthorized: true
    // rejectUnauthorized: false
  },
};

const pool = new Pool(
  process.env.NODE_ENV === 'production' ? prodSettings : devSettings
);

// get all pets by userId
app.get('/userpets', authMw, (request, response) => {
  let userId = request.userId;
  let isadmin = request.isadmin;

  let adminQuery = SELECT_PETS_BY_DESC_DATE;
  let userQuery = SELECT_PETS_BY_USER;

  pool
    .query(isadmin ? adminQuery : userQuery, [userId])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) =>
      response.status(400).json({ msg: "Failed to fetch user's pets" })
    );
});

// get all pets
app.get('/allpets', (request, response) => {
  pool
    .query(SELECT_PETS_BY_DESC_DATE)
    .then((res) => response.status(200).json(res.rows))
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to fetch all pets' })
    );
});

// get/fetch limited amount of pets to pagination
app.get('/pets/:fetch/:skip', (request, response) => {
  let limit = request.params.fetch;
  let offset = request.params.skip;

  pool
    .query(SELECT_PETS_BY_PAGINATION, [
      limit,
      offset,
    ])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({ msg: 'Failed to fetch pets' }));
});

// get the total amount (number) of pets
app.get('/pets/total', (request, response) => {
  pool
    .query(SELECT_TOTAL_NUM_OF_PETS)
    .then((res) => response.status(200).json(res.rows[0].count))
    .catch((err) =>
      response
        .status(400)
        .json({ msg: 'Failed to fetch the total amount of pets' })
    );
});

// from pets table get one pet by id
app.get('/pets/:id', (request, response) => {
  let id = request.params.id;

  pool
    .query(SELECT_PET_BY_ID, [id])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to fetch pet by id' })
    );
});

app.get('/username', authMw, (request, response) => {
  let id = request.userId;

  pool
    .query(SELECT_USER_BY_ID, [id])
    .then((res) => response.status(200).json(res.rows[0].username))
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to fetch username' })
    );
});

// get all users
app.get('/users', authMw, (request, response) => {
  pool
    .query(SELECT_ALL_USERS)
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({ msg: 'Failed to fetch user' }));
});

// edit pet by user (user dashboard)
app.put('/editpet/:id', authMw, (request, response) => {
  let id = request.params.id;
  let petstatus = request.body.petstatus;
  let petlocation = request.body.petlocation;
  let species = request.body.species;
  let petsize = request.body.petsize;
  let breed = request.body.breed;
  let sex = request.body.sex;
  let color = request.body.color;
  let age = request.body.age;
  let uniquefeature = request.body.uniquefeature;
  let postdescription = request.body.postdescription;

  pool
    .query( 
      UPDATE_PET,
      [
        petstatus,
        petlocation,
        species,
        petsize,
        breed,
        sex,
        color,
        age,
        uniquefeature,
        postdescription,
        id,
      ]
    )
    .then((res) =>
      response.status(200).json({ msg: 'Post is successfully updated' })
    )
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to update your post' })
    );
});

// edit user data (user dashboard)
app.put('/editprofile', [authMw, isFormValid], (request, response) => {
  let id = request.userId;
  let username = request.body.username;
  let email = request.body.email;
  let pw = request.body.pw;
  let phone = request.body.phone;
  let encryptedPw = bcrypt.hashSync(pw, 10);

  pool
    .query(
      UPDATE_USER,
      [
        username, 
        email, 
        encryptedPw, 
        phone, 
        id
      ]
    )
    .then((res) =>
      response.status(200).json({ msg: 'Profile is succesfully updated' })
    )
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to update your profile' })
    );
});

// delete 1 pet by user (user dashboard)
app.delete('/deletepet/:id', authMw, (request, response) => {
  let id = request.params.id;
  // let isadmin = request.isadmin;

  pool
    .query(DELETE_PET_BY_ID, [id])
    .then((res) =>
      response.status(200).json({ msg: 'Pet is successfully deleted' })
    )
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to delete the pet' })
    );
});

// delete all pets by user (user dashboard)
app.delete('/deleteallpets', authMw, (request, response) => {
  let userId = request.userId;
  let isadmin = request.isadmin;

  let adminQuery = DELETE_ALL_PETS;
  let userQuery = DELETE_PET_BY_USER;

  pool
    .query(isadmin ? adminQuery : userQuery, [userId])
    .then((res) =>
      response.status(200).json({ msg: 'All pets are successfully deleted' })
    )
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to delete all pets' })
    );
});

// delete user - delete user and the connected pets (user dashboard)
app.delete('/deleteuser', authMw, (request, response) => {
  let userId = request.userId;

  pool
    .query(DELETE_PET_BY_USER, [userId])
    .then((res) => {
      pool
        .query(DELETE_USER_BY_ID, [userId])
        .then((res) =>
          response.status(200).json({
            msg: 'Your account and your posts are successfully deleted',
          })
        )
        .catch((err) =>
          response.status(400).json({ msg: 'Failed to delete your account' })
        );
    })
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to delete your posts' })
    );
});

// register
app.post('/register', [isFormValid], (request, response) => {
  let username = request.body.username;
  let email = request.body.email;
  let pw = request.body.pw;
  let phone = request.body.phone;
  let encryptedPw = bcrypt.hashSync(pw, 10);

  pool
    .query(
      INSERT_USER_VALUES,
      [username, email, encryptedPw, phone]
    )
    .then((res) =>
      response.status(200).json({ msg: 'User succesfully created' })
    )
    .catch((err) => {
      if (err.code === '23505' && err.constraint === 'users_email_key') {
        response.status(400).json({ msg: 'Email address is already exists' });
      } else if (err.code === '23505' && err.constraint === 'users_phone_key') {
        response.status(400).json({ msg: 'Phone number is already exists' });
      } else if (err.code != '23505' && isFormValid) {
        isFormValid;
      }
    });
});

// login
app.post('/login', [isFormValid], (request, response) => {
  let email = request.body.email;
  let pw = request.body.pw;

  pool
    .query(SELECT_USER_BY_EMAIL, [email])
    .then((res) => {
      let userObject = res.rows[0];
      let encryptedPw = userObject.pw;

      res.rows &&
        bcrypt.compare(pw, encryptedPw).then((isMatch) => {
          if (isMatch) {
            jwt.sign(
              { id: userObject.id, isadmin: userObject.isadmin },
              'r4uqSKqC6L',
              (err, token) => {
                response.status(200).json(token);
              }
            );
          } else {
            response.status(403).json({ msg: 'Passwords do not match' });
          }
        });
    })
    .catch((err) => {
      isFormValid ? isFormValid : console.log(err);
      response.status(400).json({ msg: 'User not found' });
    });
});

// report pet by user
app.post('/reportpet', [authMw, upload.single('file')], (request, response) => {
  let userId = request.userId;
  let img = request.file.buffer.toString('base64');
  let petstatus = request.body.petstatus;
  let petlocation = request.body.petlocation;
  let species = request.body.species;
  let petsize = request.body.petsize;
  let breed = request.body.breed;
  let sex = request.body.sex;
  let color = request.body.color;
  let age = request.body.age;
  let uniquefeature = request.body.uniquefeature;
  let postdescription = request.body.postdescription;

  pool
    .query(
      INSERT_PET_VALUES,
      [
        userId,
        img,
        petstatus,
        petlocation,
        species,
        petsize,
        breed,
        sex,
        color,
        age,
        uniquefeature,
        postdescription,
      ]
    )
    .then((res) => response.status(200).json(res.rows))
    .catch((err) =>
      response.status(400).json({ msg: 'Failed to add new pet' })
    );
  // .catch((err) => console.log(err))
});

// *** Working, but unused queries on frontend side ***

// Multer 1 file:
// app.post('/single/:petId', [authMw, upload.single('image')], (request, response) => {
//     // let image = request.file;
//     let petId = request.params.petId;
//     let filename = request.file.filename;
//     let filepath = request.file.path;
//     let mimetype = request.file.mimetype;
//     let size = request.file.size;

//     pool.query('INSERT INTO images(petId, filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING *', [petId, filename, filepath, mimetype, size])
//     .then((res) => response.status(200).json({msg: 'Image is successfully uploaded'}))
//     .catch((err) => response.status(400).json({msg: 'Failed to upload the image'}))
// });

// // Multer mulitple files:
// app.post('/multiple', [authMw, upload.array('images', 7)], (request, response) => {
//     let images = request.files

//     response.status(200).json({msg: 'Images are successfully uploaded'})
// });

// search (radio buttons and checkboxes)
// app.get('/search?', (request, response) => {
//     let selectAll = 'SELECT * FROM pets';
//     const existingParams = ['petstatus', 'species', 'petsize', 'breed', 'sex', 'color', 'age'].filter(field => request.query[field]);

//     if (existingParams.length) {
//         selectAll += ' WHERE ';
//         selectAll += existingParams.map(field => `${field} = '${request.query[field]}'`).join(' AND ');
//     }

//     pool.query(selectAll)
//     .then((res) => response.status(200).json(res.rows))
//     .catch((err) => response.status(400).json({msg: 'Pet not found'}));
// });

// app.get('/searchpets', (request, response) => {
//     // 1st option:
//     // pool.query("SELECT * FROM pets WHERE petstatus LIKE '%lost%' OR petstatus LIKE '%lost%'")
//     // 2nd option (but it is case sensitive):
//     // pool.query("SELECT * FROM pets WHERE petstatus LIKE ANY (array['%lost%', '%found%', '%reunited%'])")

//     // 3rd option (case insensitive):
//     pool.query("SELECT * FROM pets WHERE petstatus ~* 'lost|found'")
//     .then((res) => response.status(200).json(res.rows))
//     .catch((err) => response.status(400).json({msg: 'Pet not found'}));
// });

app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

app.listen(port, () => console.log('Server is running on 3003'));
