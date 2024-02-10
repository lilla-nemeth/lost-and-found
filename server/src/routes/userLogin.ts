import { Router } from 'express';
import { isFormValid } from '../middlewares/middlewares';
import * as readQueries from '../sequelize/queries/readQueries';

const router = Router();

router.post('/', [isFormValid], readQueries.signIn);

export default router;
