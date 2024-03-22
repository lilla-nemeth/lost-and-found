import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMw } from './middlewares';
import { getUsername } from './controllers/userControllers';
import { getAll } from './controllers/clientControllers';
import path from 'path';

// Express routes
import dashboardPets from './routes/petDashboard';
import dashboardUser from './routes/userDashboard';
import users from './routes/petProfile';
import pets from './routes/pets';
import signUpUser from './routes/userSignUp';
import loginUser from './routes/userLogin';
import petData from './routes/petReport';

dotenv.config({ path: '../.env' });

const app: Application = express();

// Body parsing middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let DEBUG = false;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

// For navbar
app.get('/username', authMw, getUsername);

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

app.get('*', getAll);

export default app;
