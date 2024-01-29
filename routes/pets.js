import { Router } from 'express';
import { authMw, isFormValid, upload } from '../middlewares.js';
import * as queries from '../queries/queries.js';

const router = Router();

router.get('/', queries.getAllPets);

// TODO: test this route if pagination works
router.get('/pets/:fetch/:skip', queries.getPetsByPagination);

router.get('/pets/total', queries.getTotalNumberOfPets);

router.get('/pets/:id', queries.getPetById);

export default router;
