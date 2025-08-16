import express from 'express';
import { createUserArt, deleteUserArt, getArtworkDetail, updateUserArt, viewUserArts } from '../controllers/userController.js';
import verifyToken from '../middleware/verifyToken.js'

const userRouter = express.Router();

userRouter.post('/create-artwork',verifyToken, createUserArt);
userRouter.get('/view/user/artworks',verifyToken, viewUserArts);
userRouter.delete('/delete-artwork/:id',verifyToken, deleteUserArt);
userRouter.put('/update-artwork/:id',verifyToken, updateUserArt);
userRouter.get('/get-artwork/:id', getArtworkDetail);

export default userRouter;