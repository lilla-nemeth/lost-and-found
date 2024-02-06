import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authMw } from './middlewares/middlewares';
import * as queries from './sequelize/queries/queries';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Express routes
import dashboardPets from './routes/petDashboard';
import dashboardUser from './routes/userDashboard';
import users from './routes/petProfile';
import pets from './routes/pets';
import signUpUser from './routes/userSignUp';
import loginUser from './routes/userLogin';
import petData from './routes/petReport';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());
app.use(express.json());

let DEBUG = false;

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client/build')));
}

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
