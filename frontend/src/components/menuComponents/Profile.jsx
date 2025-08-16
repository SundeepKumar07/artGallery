import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { signInSuccess, updateFailure, updateStart, updateSuccess } from '../../redux/user/userSlice.js';
import { useRef } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useSelector(state => state.user);
  const fileRef = useRef(null);

  const handleDelete = async () => {
    if (!window.confirm("Do you want to delete your account")) return;
    const url = `${import.meta.env.VITE_API_BACKEND}/api/auth/delete-account`;
    const res = await fetch(url, { method: 'DELETE', credentials: 'include' });
    const data = await res.json();
    if (!data.success) return console.log(data.message);
    dispatch(signInSuccess(null));
    navigate('/');
    toast.success(data.message);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    dispatch(updateStart());
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'profile-pic');
      const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_API;
      const res = await fetch(cloudinaryUrl, { method: 'POST', body: formData });
      const data = await res.json();
      if (!data) {
        dispatch(updateFailure(data.message));
        return;
      }
      const updateRes = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/auth/update-avatar`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: data.secure_url }),
      });
      const updateData = await updateRes.json();
      if (!updateData) return console.log(updateData.message);
      dispatch(updateSuccess(updateData.user));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Column - Profile Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt="profile"
              onClick={() => fileRef.current.click()}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-md cursor-pointer hover:scale-105 transition-transform duration-200"
            />
            <input ref={fileRef} onChange={handleImageChange} accept="image/*" type="file" hidden />
          </div>
          <h2 className="mt-4 text-2xl font-semibold">{currentUser.name}</h2>
          <p className="text-gray-500">{currentUser.email}</p>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <div className="flex gap-4 mt-6 w-full">
            <button
              onClick={() => navigate('/update-profile')}
              className="flex-1 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            >
              Update Profile
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-2 bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6">Account Information</h1>
          <div className="space-y-6">
            <div>
              <span className="block font-semibold text-gray-600">Full Name</span>
              <p className="text-lg">{currentUser.name}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-600">Email</span>
              <p className="text-lg">{currentUser.email}</p>
            </div>
            <div>
              <span className="block font-semibold text-gray-600">Bio</span>
              <p className="text-gray-700 leading-relaxed">
                {currentUser.bio || "No bio available"} 
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}