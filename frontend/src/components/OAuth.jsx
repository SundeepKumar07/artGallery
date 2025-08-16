import { useState } from "react"
import { toast } from "react-toastify";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const provieer = new GoogleAuthProvider();
            const auth = getAuth(app); 
            const result = await signInWithPopup(auth, provieer);
            const url = `${import.meta.env.VITE_API_BACKEND}/api/auth/google`;
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, avatar: result.user.photoURL}),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                setLoading(false);
                return;
            }
            dispatch(signInSuccess(data.user));
            setLoading(false);
            navigate('/menu');
            toast.success(data.message);
        } catch (error) {
            console.log("Cannot sign in with Google", error);
        }
    }
  return (
    <div>
        <button onClick={handleSubmit} type="button" className="bg-blue-600 text-white py-2 rounded-lg hover:cursor-pointer hover:bg-blue-700 w-full">{loading? 'loading...' : 'Continue with Google'}</button>
    </div>
  )
}
