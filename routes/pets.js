import { Router } from 'express';
import * as queries from '../sequelize/queries/queries.js';

const router = Router();

router.get('/', queries.getAllPets);

router.get('/pets/:fetch/:skip', queries.getPetsByPagination);

router.get('/pets/total', queries.getTotalNumberOfPets);

router.get('/pets/:id', queries.getPetById);

export default router;
