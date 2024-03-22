import { Router } from 'express';
import { authMw } from '../middlewares';
import { getAllUsers } from '../controllers/userControllers';

const router = Router();

router.get('/', authMw, getAllUsers);

export default router;
