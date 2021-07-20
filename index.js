const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); 
const { JsonWebTokenError } = require('jsonwebtoken');
const { request, response } = require('express');
// const path = require("path");
// require('dotenv').config();
const { authMw } = require('./middlewares.js');

// amikor a backend és a frontend különböző portokon fut, akkor cors elhárítja a hibát, engedélyezi a kül portok közötti kommunikációt
app.use(cors());
// express.json (post kérésekben a body-t ki tudjuk nyerni - régi verzióban külön kellet body parser-t installálni, ezt kiküszöböli)
app.use(express.json());

const port = process.env.PORT || 3003;

// adatbázis konfigurálása kell a kérések előtt
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'lostandfound'
})

// from pets table get all pets by userId
app.get('/pets', authMw, (request, response) => {
    let userId = request.userId;

    pool.query('SELECT * FROM pets WHERE userId=$1', [userId])
    .then((res) => response.status(200).json(res.rows))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch all pets'}));
})

// from pets table get one pet by id
app.get('/pets/:id', (request, response) => {
    let id = request.params.id;

    pool.query('SELECT * FROM pets WHERE id=$1', [id])
    .then((res) => response.status(200).json({msg: 'Pet successfully fetched'}))
    .catch((err) => response.status(400).json({msg: 'Failed to fetch pet by id'}));
})

// Add new pet:
app.post('/pets', (request, response) => {
    // let userId = request.userId
    let userId = 3;
    let addstatus = request.body.addstatus;
    let region = request.body.region;
    let municipality = request.body.municipality;
    let zip = request.body.zip;
    let district = request.body.district;
    let street = request.body.street;
    let species = request.body.species;
    let size = request.body.size;
    let breed = request.body.breed;
    let sex = request.body.sex;
    let color = request.body.color;
    let age = request.body.age;
    let uniquefeature = request.body.uniquefeature;
    let postdescription = request.body.postdescription;


    pool.query('INSERT INTO pets(userId, addstatus, region, municipality, zip, district, street, species, size, breed, sex, color, age, uniquefeature, postdescription) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *', [userId, addstatus, region, municipality, zip, district, street, species, size, breed, sex, color, age, uniquefeature, postdescription])
    .then((res) => console.log('Pet successfully inserted'))
    .catch((err) => console.log('Failed to add new pet'));
})

app.post('/register', (request, response) => {
    let username = request.body.username;
    let email = request.body.email;
    let pw = request.body.pw;
    let phone = request.body.phone;
    // bcrypt könyvtár hasheli a jelszót (pl. pw: makea... -> pw: $2a$10$vg/...):
    let encryptedPw = bcrypt.hashSync(pw, 10);

    // tehát csak az encryptedPw kerül elmentésre (hashelt jelszó):
    pool.query('INSERT INTO users(username, email, pw, phone) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, encryptedPw, phone])
    .then((res) => response.status(200).json({msg: 'User succesfully created'}))
    .catch((err) => response.status(400).json({msg: 'Failed to create user'}))
})

app.post('/login', (request, response) => {
    let email = request.body.email;
    // POST login kérésben megadtuk a jelszót, ami nem hashelt:
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
})


app.listen(port, () => console.log("Server is running on 3003"));