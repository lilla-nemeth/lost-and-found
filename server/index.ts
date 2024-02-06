import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMw } from './middlewares/middlewares.js';
import * as queries from './sequelize/queries/queries.js';

// Express routes
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

const port = process.env.PORT || 8080;

// For navbar
app.get('/username', authMw, queries.getUsername);

// Home
app.use('/', pets);

// Pet Profile
app.use('/petprofile/:id', users);

// Dashboard
app.use('/dashboard', dashboardUser);
app.use('/dashboard', dashboardPets);

// Sign Up
app.use('/signup', signUpUser);

// Login
app.use('/login', loginUser);

// Pet Report
app.use('/reportpet', petData);

app.get('*', queries.getAll);

app.listen(port, () => console.log('Server is running on 8080'));
