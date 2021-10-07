const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');

const { authMw, isEmailValid, isPhoneValid, isUsernameValid, isPasswordValid, upload } = require('./middlewares.js');

let DEBUG = true;

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3003;

const devSettings = {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE
}

const pool = new Pool(devSettings);

// from pets table get all pets by userId - user get all his/her added pets
app.get('/pets', authMw, (request, response) => {
    let userId = request.userId;

    pool.query('SELECT * FROM pets WHERE userId=$1', [userId])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch all pets'}));
});
 
// Pagination:
app.get('/pets/:fetch/:skip', (request, response) => {
    // limit = fetch
    // offset = skip
    let limit = request.params.fetch;
    let offset = request.params.skip;

    pool.query('SELECT * FROM pets LIMIT $1 OFFSET $2', [limit, offset])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch pets'}));
});

// get the total amount of pets
app.get('/pets/total', (request, response) => {

    pool.query('SELECT COUNT(*) FROM pets')
    .then((res) => response.status(200).json(res.rows[0].count))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch the total amount of pets'}));
})

// TEST
// app.get('/search', (request, response) => {

    // let petstatus = request.body.petstatus;
    // let petlocation = request.body.petlocation;

    // let species = request.body.species;
    // let petsize = request.body.petsize;
    // let breed = request.body.breed;
    // let sex = request.body.sex;
    // let color = request.body.color;
    // let age = request.body.age;
    // let uniquefeature = request.body.uniquefeature;
    // let postdescription = request.body.postdescription;

//     pool.query("SELECT to_tsvector('english', 'a fat cat sat on a mat - it ate a fat rats')")
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// });

// DETAILED SEARCH
app.get('/search?', (request, response) => {
    let selectAll = 'SELECT * FROM pets';

    // add the other columns of pets!
    const existingParams = ['petstatus', 'petsize','sex'].filter(field => request.query[field]);

    // if the new existingParams array is not empty then
    // we add the WHERE word to the existingParams - which is necessary to the query and 
    // existingParams + WHERE + loop the existingParams and create a new array
    // with the params + ? + AND word  
    if (existingParams.length) {
        selectAll += ' WHERE ';
        selectAll += existingParams.map(field => `${field} = '${request.query[field]}'`).join(' AND ');      
    }

    pool.query(selectAll)
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Pet not found'}));  
});

// from pets table get one pet by id
app.get('/pets/:id', authMw, (request, response) => {
    let id = request.params.id;

    pool.query('SELECT * FROM pets WHERE id=$1', [id])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch pet by id'}));
});

app.get('/username', authMw, (request, response) => {
    let id = request.userId;

    pool.query('SELECT * FROM users WHERE id=$1', [id])
    .then((res) => response.status(200).json(res.rows[0].username))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch user'}));
})

// user dashboard - post/report a pet
app.post('/reportpet', authMw, (request, response) => {
    let userId = request.userId;
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

    pool.query('INSERT INTO pets(userId, petstatus, petlocation, species, petsize, breed, sex, color, age, uniquefeature, postdescription) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *', [userId, petstatus, petlocation, species, petsize, breed, sex, color, age, uniquefeature, postdescription])
    .then(
        (res) => {
            response.status(200).json({msg: 'Pet successfully added'})
            response.status(200).json(res.rows)
            // petId:
            console.log(res.rows[0].id)
        }
    )
    .catch((err) => response.status(400).json({msg: 'Failed to add new pet'}))

});


// make a GET request also for images!

// Multer 1 file:
app.post('/single/:petId', [authMw, upload.single('image')], (request, response) => {
    // let image = request.file;
    let petId = request.params.petId;
    let filename = request.file.filename;
    let filepath = request.file.path;
    let mimetype = request.file.mimetype;
    let size = request.file.size;
    console.log("PETID FROM Backend", petId)

    // console.log('image', image);
    console.log('--filename, mimetype, size--', filename, mimetype, size);
    console.log('--filepath--', filepath);

    pool.query('INSERT INTO images(petId, filename, filepath, mimetype, size) VALUES ($1, $2, $3, $4, $5) RETURNING *', [petId, filename, filepath, mimetype, size])
    .then((res) => response.status(200).json({msg: 'Image is successfully uploaded'}))
    .catch((err) => response.status(400).json({msg: 'Failed to upload the image'}))
});

// Multer mulitple files:
app.post('/multiple', [authMw, upload.array('images', 7)], (request, response) => {
    let images = request.files

    console.log("multiple image upload", images);
    response.status(200).json({msg: 'Multiple file upload success'})
});

// user dashboard - update one pet's datas (by id):
app.put('/editpet/:id', authMw, (request, response) => {
    let id = request.params.id;
    let petstatus = request.body.petstatus;
    let petlocation = request.body.petlocation;
    let petsize = request.body.petsize;
    let breed = request.body.breed;
    let sex = request.body.sex;
    let color = request.body.color;
    let age = request.body.age;
    let uniquefeature = request.body.uniquefeature;
    let postdescription = request.body.postdescription;

    pool.query('UPDATE pets SET petstatus=$1, petlocation=$2, petsize=$3, breed=$4, sex=$5, color=$6, age=$7, uniquefeature=$8, postdescription=$9 WHERE id=$10', [petstatus, petlocation, petsize, breed, sex, color, age, uniquefeature, postdescription, id])
    .then((res) => response.status(200).json({msg: 'Post is successfully updated'}))
    .catch((err) => response.status(400).json({msg: 'Failed to update your post'}));
});

// user dashboard - edit user's data
app.put('/editprofile', [isPasswordValid, isPhoneValid, isUsernameValid, authMw, isEmailValid], (request, response) => {
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

// user dashboard - delete one pet by id
app.delete('/deletepet/:id', authMw, (request, response) => {
    let id = request.params.id

    pool.query('DELETE FROM pets WHERE id=$1', [id])
    .then((res) => response.status(200).json({msg: 'Pet is successfully deleted'}))
    .catch((err) => response.status(400).json({msg: 'Failed to delete the pet'}));
});

// user dashboard - delete all pets
app.delete('/deleteallpets', authMw, (request, response) => {
    let userId = request.userId;

    pool.query('DELETE FROM pets WHERE userId=1', [userId])
    .then((res) => response.status(200).json({msg: 'All pets are successfully deleted'}))
    .catch((err) => response.status(400).json({msg: 'Failed to delete all pets'}));
});

// user dashboard - delete all pets and after the user account (secondary key -> primary key)
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
app.post('/register', [isEmailValid, isPhoneValid, isUsernameValid, isPasswordValid], (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    let pw = request.body.pw;
    let phone = request.body.phone;
    let encryptedPw = bcrypt.hashSync(pw, 10);

    pool.query('INSERT INTO users(username, email, pw, phone) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, encryptedPw, phone])
    .then((res) => response.status(200).json({msg: 'User succesfully created'}))
    .catch((err) => response.status(400).json({msg: 'Failed to create user'}))
});

app.post('/login', [isEmailValid], (request, response) => {
    let email = request.body.email;
    let pw = request.body.pw;
    
    pool.query('SELECT * FROM users WHERE email=$1', [email])
    .then((res) => {
        // amennyiben egy elemet térít vissza a res (response), akkor biztosan a 0. eleme a válasznak a user adatai:
        let userObject = res.rows[0];
        let encryptedPw = userObject.pw;

        // amennyiben a res.rows létezik (tehát van adatunk) és a bcrypt könyvtár user által megadott jelszava egyezik a hashelt jelszóval akkor (true), ha nem (false):
        // bcrypt beépített funkciója (compare), ami szintén .then-nel és .catch-csel folytatódik:

        res.rows && bcrypt.compare(pw, encryptedPw)
        // mégegy .then (async in async); isMatch az egy boolean érték lesz (true/false)
        .then((isMatch) => {
            // amennyiben isMatch igaz, jöhet a token (jwt), a sign (signature) beépített funkciója azt kéri imputnak, hogy valamely egyedi adatát adjuk meg a usernek (pl. id) és kér egy általunk beírt titkot (r4uqSKqC6L)
            if (isMatch) {
                jwt.sign({id: userObject.id }, 'r4uqSKqC6L', (err, token) => {
                    response.status(200).json(token);
                });
            } else {
                response.status(403).json({msg: 'Passwords do not match'})
            }
        });
    })
    .catch((err) => response.status(400).json({msg: 'User not found'}))
});

app.listen(port, () => console.log("Server is running on 3003"));