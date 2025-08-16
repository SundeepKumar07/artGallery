import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/errorHandler.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) return errorHandler(401, "unauthorized");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyToken;