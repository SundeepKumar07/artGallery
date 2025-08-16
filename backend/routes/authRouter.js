import express from 'express';
import { deleteAccount, signIn, signInWithGoogle, signOut, signUp, updateProfile, updateProfilePhoto, verifyPass } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/google', signInWithGoogle);
authRouter.post('/sign-out',verifyToken, signOut);
authRouter.put('/update-profile',verifyToken, updateProfile);
authRouter.delete('/delete-account',verifyToken, deleteAccount);
authRouter.post('/verify-password',verifyToken, verifyPass);
authRouter.post('/update-avatar',verifyToken, updateProfilePhoto);

export default authRouter;