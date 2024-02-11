import { Router } from 'express';
import { isFormValid } from '../middlewares/middlewares';
import { createUserAccount } from '../controllers/userControllers';

const router = Router();

router.post('/', [isFormValid], createUserAccount);

export default router;
