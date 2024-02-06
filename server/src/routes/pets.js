import { Router } from 'express';
import { authMw } from '../middlewares/middlewares.js';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.get('/', authMw, queries.getAllUsers);
router.get('/pets/:fetch/:skip', queries.getPetsByPagination);
router.get('/pets/:id', queries.getPetById);

export default router;
