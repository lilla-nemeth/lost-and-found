import { Router } from 'express';
import { authMw } from '../middlewares';
import { getAllUserPets, updatePet, deletePet, deleteAllPets } from '../controllers/petControllers';

const router = Router();

router.get('/', authMw, getAllUserPets);
router.delete('/pet/:id', authMw, deletePet);
router.delete('/pet', authMw, deleteAllPets);
router.put('/pet/:id', authMw, updatePet);

export default router;
