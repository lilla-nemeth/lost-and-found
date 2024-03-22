import { Router } from 'express';
import { isFormValid } from '../middlewares';
import { createAccount } from '../controllers/userControllers';

const router = Router();

router.post('/', [isFormValid], createAccount);

export default router;
