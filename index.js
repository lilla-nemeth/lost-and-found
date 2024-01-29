import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { authMw, isFormValid, upload } from './middlewares.js';
import * as queries from './queries/queries.js';

import dashboardPets from './routes/petDashboard.js';
import dashboardUser from './routes/userDashboard.js';
import users from './routes/petProfile.js';
import pets from './routes/pets.js';
import signUpUser from './routes/userSignUp.js';
import loginUser from './routes/userLogin.js';
import petData from './routes/petReport.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

let DEBUG = false;

const port = process.env.PORT || 3003;

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
	host: process.env.PG_HOST,
	dialect: 'postgres',
	pool: {
		max: 9,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully');
	})
	.catch((err) => {
		console.log('Unable to connect to the database', err);
	});

// GET

// Dashboard
// app.get('/userpets', authMw, queries.getAllUserPets);
// app.put('/:id', authMw, queries.updatePetData);
// app.delete('/:id', authMw, queries.deleteUserPet);
// app.delete('/dashboard', authMw, queries.deleteAllUserPets);
// app.put('/editprofile', [authMw, isFormValid], queries.updateUserData);
// app.delete('/deleteuser', authMw, queries.deleteUser);

// Home (lostandfound)
// app.get('/allpets', queries.getAllPets);
// app.get('/pets/:fetch/:skip', queries.getPetsByPagination);
// app.get('/pets/total', queries.getTotalNumberOfPets);
// app.get('/pets/:id', queries.getPetById);

// Pet profile
// app.get('/users', authMw, queries.getAllUsers);

// Sign Up
// app.post('/signup', [isFormValid], queries.createAccount);

// Login
// app.post('/login', [isFormValid], queries.signIn);

// Pet Report
// app.get('/locationsearch/:query', queries.getGeocodeLocation);
// app.post('/reportpet', [authMw, upload.single('file')], queries.createPetProfile);

//////////////////////////////////////////////////////////////////

// Home
app.use('/', pets);

// Pet Profile
app.use('/petprofile/:id', users);

// Dashboard
app.use('/dashboard', dashboardPets);
app.use('/dashboard', dashboardUser);

// Sign Up
app.use('/signup', signUpUser);

// Login
app.use('/login', loginUser);

// Pet Report
app.use('/reportpet', petData);

///////////////////////////////////////////////////////////////////

app.get('/username', authMw, queries.getUsername);

// app.get('*', queries.getAll);

app.listen(port, () => console.log('Server is running on 3003'));
