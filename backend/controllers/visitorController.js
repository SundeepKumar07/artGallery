import {errorHandler} from '../utils/errorHandler.js';
import Art from '../models/artWorkModel.js';

export const createRequest = async (req, res, next) => {
    const artworkId = req.params.id;
    const {name, email, phoneNo, message} = req.body;
    if(!name || !email || !phoneNo || !message) return next(errorHandler(400, "All fields are required"));
    try {
        const updateArtwork = await Art.findByIdAndUpdate(
            artworkId, 
            {$push: {visitors: { name, email, phoneNo, message }}}, 
            {new: true, runValidators: true}
        );
        if(!updateArtwork) return next(errorHandler(404, "Artwork not found"));
        return res.status(200).json({success: true, message: "Your request send successfully, You will soon get response on given contact ids"})
    } catch (error) {
        next(error);
    }
}

export const viewRequests = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const artworks = await Art.find({userRef: userId, $expr: { $gt: [{ $size: "$visitors" }, 0] }})
        if(!artworks) return next(errorHandler(404, "User has no requests"));
        const totalRequests = artworks.reduce(
            (sum, art) => sum + art.visitors.length,
            0
        );
        res.status(200).json({success: true,message: "Fetched Successfully", artworks, totalartworks: artworks.length, totalRequests});
    } catch (error) {
        next(error);
    }
}

export const searchArtWorks = async (req, res, next ) => {
    try {
        const limit = parseInt(req.query.limit) || 12;
        const page = parseInt(req.query.page) || 1; // Current page (default 1)
        const skip = (page - 1) * limit;

        const searchTerm = req.query.searchTerm || "";

        const query = {};

        if (searchTerm) {
            query.$or = [
                { name: { $regex: searchTerm, $options: "i" } },
                { category: { $regex: searchTerm, $options: "i" } },
            ];
        }

        const totalCount = await Art.countDocuments(query);
        const artworks = await Art.find(query)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalCount / limit);

        res.status(200).json({
            success: true,
            message: "Search results fetched successfully",
            artworks,
            pagination: {
                totalItems: totalCount,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        next(error);
    }
};