import { Router } from 'express';
import { getUserDetails } from "../../controllers/user.controller";
import generateToken from '../../middlewares/token.middleware';
const router = Router();

router.get('/user/:username/', generateToken, getUserDetails);

export default router;
