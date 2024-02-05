import { Router } from 'express';
import { authMw } from '../middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

// TODO: Temporary solution, getAllPets should have another query from users table, getting users data
router.get('/', authMw, queries.getAllUsers);

router.get('/', queries.getAllPets);
router.get('/pets/:fetch/:skip', queries.getPetsByPagination);
router.get('/pets/total', queries.getTotalNumberOfPets);
router.get('/pets/:id', queries.getPetById);

export default router;
