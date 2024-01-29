import { Router } from 'express';
import { authMw, isFormValid, upload } from '../middlewares.js';
import * as queries from '../queries/queries.js';

const router = Router();

router.get('/', authMw, queries.getAllUsers);

router.post('/', [authMw, upload.single('file')], queries.createPetProfile);

export default router;
