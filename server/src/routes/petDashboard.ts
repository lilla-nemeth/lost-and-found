import { Router } from 'express';
import { authMw } from '../middlewares/middlewares';
import { getAllUserPets, updatePet, deleteUserPet, deleteAllPets } from '../controllers/petControllers';

const router = Router();

router.get('/', authMw, getAllUserPets);
router.delete('/pet/:id', authMw, deleteUserPet);
router.delete('/pet', authMw, deleteAllPets);
router.put('/pet/:id', authMw, updatePet);

export default router;
