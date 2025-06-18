import express, { Router } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { signUp, login, refreshToken, getDetails, logout } from '../../controllers/publicController';
import authenticate from '../../middleware/auth';

const router: Router = express.Router();

router.post('/signup', asyncHandler(signUp));
router.post('/login', asyncHandler(login));
router.post('/logout', asyncHandler(logout));
router.post('/refresh', asyncHandler(refreshToken));
router.get('/get', authenticate, asyncHandler(getDetails));

export default router;
