import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/errorHandler.js';
import {generateToken} from '../utils/generateToken.js';

export const signUp = async (req, res, next) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        return next(errorHandler(400, "All fields are required"));
    }
    
    try {
        const checkExisting = await User.findOne({email});
        if(checkExisting){
            return next(errorHandler(409, "User Already Exist"));
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashPassword});

        //generate token
        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            maxAge: 7 * 24 * 3600 * 1000,
        })

        const {password: _, ...userData}  = user._doc;
        return res.status(201).json({
            success: true, 
            message: "Account created successfully",
            user: userData, 
        });
    } catch (error) {
        return next(error)
    }
}

export const signIn = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(errorHandler(400, "All fields required"));
    }
    try {
        const user = await User.findOne({email});

        if(!user) return next(errorHandler(404, "User not found"));

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return next(errorHandler(401, "Invalid credentials"))
        }

        const token = generateToken(user._id);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
            maxAge: 7 * 24 * 3600 * 1000,
        });

        const { password: _, ...userData } = user._doc;
        return res.status(200).json({
            success: true,
            message: "Login Successfully", 
            user: userData
        });
    } catch (error) {
        return next(error);
    }
}

export const signInWithGoogle = async (req, res, next) => {
    const {name, email, avatar} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            const token = generateToken(user._id);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
                maxAge: 7 * 24 * 3600 * 1000,
            });
        }else{
            const generatePassword = Math.random().toString(36).slice('-8') + Math.random().toString(36).slice('-8');
            const hashPassword = await bcrypt.hash(generatePassword, 10);
            user = new User({name, email, password: hashPassword, avatar});
            await user.save();
            
            const token = generateToken(user._id);
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
                maxAge: 7 * 24 * 3600 * 1000,
            });
        }
        const { password: _, ...userData } = user._doc;
        return res.status(200).json({
            success: true,
            message: "Login Successfully", 
            user: userData
        });
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) =>{
    const userId = req.user.id;
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
        });
        return res.status(201).json({success: true, message: "Logged Out"});
    } catch (error) {
        return next(error);
    }
}

export const updateProfile = async (req, res, next) => {
    const userId = req.user.id;

    const { name, email, password, bio } = req.body;

    try {
        // Prepare updated data
        const updatedData = {};
        if (name) updatedData.name = name;
        if (email) updatedData.email = email;
        if (bio) updatedData.bio = bio;

        // If changing password
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true, runValidators: true }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Updated Successfully",
            user: updatedUser
        });

    } catch (error) {
        return next(error);
    }
};

export const deleteAccount = async (req, res, next) => {
    const userId = req.user.id;
    if(!userId) return next(errorHandler(401, "Unauthorized"));
    try {
        const user = await User.findByIdAndDelete(userId);
        if(!user) return next(errorHandler(404, "Something went wrong"));
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production'? 'none': 'strict',
        });
        return res.status(200).json({success: true, message: "Account deleted successfully"})        
    } catch (error) {
        return next(error);
    }
}

export const verifyPass = async (req, res, next) => {
    const userId = req.user.id;
    // Find user
    try {
        const user = await User.findById(userId);
        const {verifyPassword} = req.body;
        if(!verifyPassword) return next(errorHandler(400, "VerifyPassword is necessary"));
        // Verify current password before update
        const verified = await bcrypt.compare(verifyPassword, user.password);
        if (!verified) return next(errorHandler(403, "Enter correct password to update"));
        res.json({success: true, message: "Verified Successfully"});   
    } catch (error) {
        next(error);
    }
}

export const updateProfilePhoto = async (req, res, next) => {
    const userId = req.user.id;
    const {avatar} = req.body;
    if(!avatar) return next(errorHandler(400, "avatar is required"));
    try{
        const user = await User.findByIdAndUpdate(userId, { avatar }, {new: true, runValidators: true}).select('-password');
        if(!user) return next(errorHandler(404, "User not found"));
        return res.status(200).json({success: true, message: "Updated Successfully", user});
    }catch(error){
        return next(error);
    }
}