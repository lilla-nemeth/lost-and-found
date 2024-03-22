import { Router } from 'express';
import { isFormValid } from '../middlewares';
import { signIn } from '../controllers/userControllers';

const router = Router();

router.post('/', [isFormValid], signIn);

export default router;
