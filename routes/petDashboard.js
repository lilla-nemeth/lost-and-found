import { Router } from 'express';
import { authMw, isFormValid, upload } from '../middlewares.js';
import * as queries from '../queries/queries.js';

const router = Router();

router.get('/', authMw, queries.getAllUserPets);

router.delete('/pet/:id', authMw, queries.deleteUserPet);

router.delete('/pet', authMw, queries.deleteAllUserPets);

router.get('/', queries.getAllPets);

router.put('/pet/:id', authMw, queries.updatePetData);

export default router;
