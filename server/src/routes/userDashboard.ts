import { Router } from 'express';
import { authMw, isFormValid } from '../middlewares/middlewares';
import { updateUser, deleteUser } from '../controllers/userControllers';

const router = Router();

router.put('/user', [authMw, isFormValid], updateUser);
router.delete('/user', authMw, deleteUser);

export default router;
