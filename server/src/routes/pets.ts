import { Router } from 'express';
import { authMw } from '../middlewares';
import { getPetsByPagination, getPetById } from '../controllers/petControllers';
import { getAllUsers } from '../controllers/userControllers';

const router = Router();

router.get('/', authMw, getAllUsers);
router.get('/pets/:fetch/:skip', getPetsByPagination);
router.get('/pets/:id', getPetById);

export default router;
