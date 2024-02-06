import { Router } from 'express';
import { isFormValid } from '../middlewares/middlewares';
import * as queries from '../sequelize/queries/queries';

const router = Router();

router.post('/', [isFormValid], queries.createUserAccount);

export default router;
