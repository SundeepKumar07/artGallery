import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnvjC-fRDnvHPKHmVgfZHK5UpJkn-1PjWbDg&s',
    },
    bio: {
        type: String,
        default: "Artist",
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

