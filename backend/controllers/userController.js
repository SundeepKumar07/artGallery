import Art from "../models/artWorkModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createUserArt = async (req, res, next) => {
    const userId = req.user.id;
    const {name, description, imageUrl, category} = req.body;

    try {
        const artwork = await Art.create({name, description, imageUrl, category, userRef: userId})
        if(!artwork) return next(errorHandler(400, "Something went wrong"));
        res.status(200).json({success: true, message: "Your artwork uploaded successfully", artwork});
    } catch (error) {
        return next(error);
    }

}

export const viewUserArts = async (req, res, next) => {
    const userId = req.user.id;
    try {
        if(userId){
            const artworks = await Art.find({userRef: userId});
            if(!artworks) return next(404, "No artwork found");
            res.status(200).json({success: true, message: "Command Successful", artworks});
        }else{
            return next(errorHandler(401, "You can only access your artworks"));
        }
    } catch (error) {
        return next(error);
    }
}

export const deleteUserArt = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const artwork = await Art.findById(req.params.id);
        if(!artwork) return next(errorHandler(404, "User has no such artwork"));
        if(artwork.userRef.toString() !== userId) return next(errorHandler(401, "You can only delete your artwork"));
        await Art.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Artwork deleted..."});
    } catch (error) {
        next(error);
    }
}

export const updateUserArt = async (req, res, next) => {
    const userId = req.user.id;
    const {name, description, imageUrl, category} = req.body;

    const updateData = {};
    if(name) updateData.name = name;
    if(description) updateData.description = description;
    if(imageUrl) updateData.imageUrl = imageUrl;
    if(category) updateData.category = category;
    try {
        const artwork = await Art.findById(req.params.id);
        if(!artwork) return next(errorHandler(404, "No such artwork found"));
        if(artwork.userRef.toString() !== userId ) return next(errorHandler(401, 'You can only update your artwork'));
        const updatedArt = await Art.findByIdAndUpdate(req.params.id, updateData, {new: true, runValidators: true});
        if(!updatedArt) next(errorHandler(400, "Something went wrong"));
        return res.status(200).json({success: true, message: "updated successfully",artwork: updatedArt});
    } catch (error) {
        next(error);
    }
}

export const getArtworkDetail = async (req, res, next) => {
    const artworkId = req.params.id;
    try {
        const artwork = await Art.findById(artworkId);
        if(!artwork) return next(errorHandler(404, "Not found"));
        return res.status(200).json({success: true, artwork});
    } catch (error) {
        next(error);
    }
}