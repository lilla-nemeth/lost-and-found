import { Router } from 'express';
import { authMw, isFormValid, upload } from '../middlewares.js';
import * as queries from '../queries/queries.js';

const router = Router();

router.get('/', authMw, queries.getAllUserPets);

router.delete('/pet/:id', authMw, queries.deleteUserPet);

router.delete('/pet', authMw, queries.deleteAllUserPets);

// TODO fix this, it should refresh the main home page with this query
router.get('/', queries.getAllPets);

router.put('/pet/:id', authMw, queries.updatePetData);

export default router;
