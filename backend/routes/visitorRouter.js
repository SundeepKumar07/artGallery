import express from 'express';
import { createRequest, searchArtWorks, viewRequests } from '../controllers/visitorController.js';
import verifyToken from '../middleware/verifyToken.js';
const visitorRouter = express.Router();

visitorRouter.post('/create-request/:id', createRequest);
visitorRouter.get('/view-requests',verifyToken, viewRequests);
visitorRouter.get('/search-request', searchArtWorks);

export default visitorRouter;