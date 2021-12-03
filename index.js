const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const { authMw, isFormValid, upload } = require('./middlewares.js');

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
    database: process.env.PG_DATABASE
}

const prodSettings = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: process.env.NODE_ENV === 'production' ? false : true
        // rejectUnauthorized: true
        // rejectUnauthorized: false
    }
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? prodSettings : devSettings);

// get all pets by userId
app.get('/userpets', authMw, (request, response) => {
    let userId = request.userId;

    pool.query('SELECT * FROM pets WHERE userId=$1 ORDER BY since DESC', [userId])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: "Failed to fetch user's pets"}));
});

// get all pets
app.get('/allpets', (request, response) => {

    pool.query('SELECT * FROM pets ORDER BY since DESC')
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch all pets'}));
    // .catch((err) =>console.log(err));
});
 
// get/fetch limited amount of pets

// limit = fetch
// offset = skip
app.get('/pets/:fetch/:skip', (request, response) => {
    let limit = request.params.fetch;
    let offset = request.params.skip;

    pool.query('SELECT * FROM pets ORDER BY since DESC LIMIT $1 OFFSET $2', [limit, offset])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch pets'}));
});

// get the total amount (number) of pets
app.get('/pets/total', (request, response) => {

    pool.query('SELECT COUNT(*) FROM pets')
    .then((res) => response.status(200).json(res.rows[0].count))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch the total amount of pets'}));
});

// from pets table get one pet by id
app.get('/pets/:id', (request, response) => {
    let id = request.params.id;

    pool.query('SELECT * FROM pets WHERE id=$1', [id])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch pet by id'}));
});

app.get('/username', authMw, (request, response) => {
    let id = request.userId;

    pool.query('SELECT * FROM users WHERE id=$1', [id])
    .then((res) => response.status(200).json(res.rows[0].username))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch username'}));
})

// get all users
app.get('/users', authMw, (request, response) => {

    pool.query('SELECT * FROM users')
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch user'}));
})

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

    pool.query('UPDATE pets SET petstatus=$1, petlocation=$2, species=$3, petsize=$4, breed=$5, sex=$6, color=$7, age=$8, uniquefeature=$9, postdescription=$10 WHERE id=$11', [petstatus, petlocation, species, petsize, breed, sex, color, age, uniquefeature, postdescription, id])
    .then((res) => response.status(200).json({msg: 'Post is successfully updated'}))
    .catch((err) => response.status(400).json({msg: 'Failed to update your post'}));
});

// edit user data (user dashboard)
app.put('/editprofile', [authMw, isFormValid], (request, response) => {
    let id = request.userId;
    let username = request.body.username;
    let email = request.body.email;
    let pw = request.body.pw;
    let phone = request.body.phone;
    let encryptedPw = bcrypt.hashSync(pw, 10);
 
    pool.query('UPDATE users SET username=$1, email=$2, pw=$3, phone=$4 WHERE id=$5', [username, email, encryptedPw, phone, id])
    .then((res) => response.status(200).json({msg: 'Profile is succesfully updated'}))
    .catch((err) => response.status(400).json({msg: 'Failed to update your profile'}))
});

// delete 1 pet by user (user dashboard)
app.delete('/deletepet/:id', authMw, (request, response) => {
    let id = request.params.id

    pool.query('DELETE FROM pets WHERE id=$1', [id])
    .then((res) => response.status(200).json({msg: 'Pet is successfully deleted'}))
    .catch((err) => response.status(400).json({msg: 'Failed to delete the pet'}));
});

// delete all pets by user (user dashboard)
app.delete('/deleteallpets', authMw, (request, response) => {
    let userId = request.userId;

    pool.query('DELETE FROM pets WHERE userId=$1', [userId])
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));
    .then((res) => response.status(200).json({msg: 'All pets are successfully deleted'}))
    .catch((err) => response.status(400).json({msg: 'Failed to delete all pets'}));
});

// delete user - delete user and the connected pets (user dashboard)
app.delete('/deleteuser', authMw, (request, response) => {
    let userId = request.userId;

    pool.query('DELETE FROM pets WHERE userId=$1', [userId])
    .then((res) => {
        pool.query('DELETE FROM users WHERE id=$1', [userId])
        .then((res) => response.status(200).json({msg: 'Your account and your posts are successfully deleted'}))
        .catch((err) => response.status(400).json({msg: 'Failed to delete your account'}));
    })
    .catch((err) => response.status(400).json({msg: 'Failed to delete your posts'}));
});

// register
app.post('/register', [isFormValid], (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    let pw = request.body.pw;
    let phone = request.body.phone;
    let encryptedPw = bcrypt.hashSync(pw, 10);

    pool.query('INSERT INTO users(username, email, pw, phone) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, encryptedPw, phone])
    .then((res) => response.status(200).json({msg: 'User succesfully created'}))
    .catch((err) => {isFormValid ? isFormValid : console.log(err); response.status(400).json({msg: 'Failed to create user'})});
});

// login
app.post('/login', [isFormValid], (request, response) => {
    let email = request.body.email;
    let pw = request.body.pw;
    
    pool.query('SELECT * FROM users WHERE email=$1', [email])
    .then((res) => {
        let userObject = res.rows[0];
        let encryptedPw = userObject.pw;

        res.rows && bcrypt.compare(pw, encryptedPw)
        .then((isMatch) => {
            if (isMatch) {
                jwt.sign({id: userObject.id }, 'r4uqSKqC6L', (err, token) => {
                    response.status(200).json(token);
                });
            } else {
                response.status(403).json({msg: 'Passwords do not match'})
            }
        });
    })
    .catch((err) => {isFormValid ? isFormValid : console.log(err); response.status(400).json({msg: 'User not found'})});
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

    pool.query('INSERT INTO pets(userId, img, petstatus, petlocation, species, petsize, breed, sex, color, age, uniquefeature, postdescription) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *', [userId, img, petstatus, petlocation, species, petsize, breed, sex, color, age, uniquefeature, postdescription])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to add new pet'}))
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
//     console.log("PETID FROM Backend", petId)

//     // console.log('image', image);
//     console.log('--filename, mimetype, size--', filename, mimetype, size);
//     console.log('--filepath--', filepath);

//     pool.query('INSERT INTO images(petId, filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING *', [petId, filename, filepath, mimetype, size])
//     .then((res) => response.status(200).json({msg: 'Image is successfully uploaded'}))
//     .catch((err) => response.status(400).json({msg: 'Failed to upload the image'}))
// });


// // Multer mulitple files:
// app.post('/multiple', [authMw, upload.array('images', 7)], (request, response) => {
//     let images = request.files

//     console.log("multiple image upload", images);
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

//     if (DEBUG) console.log('existingParams - search', existingParams);
//     if (DEBUG) console.log('selectAll - search', selectAll);

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
    response.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

app.listen(port, () => console.log("Server is running on 3003"));