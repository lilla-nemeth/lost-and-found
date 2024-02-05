import { Router } from 'express';
import { authMw } from '../middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

// TODO: Temporary solution, getAllPets should have another query from users table, getting users data
router.get('/', authMw, queries.getAllUsers);

export default router;
