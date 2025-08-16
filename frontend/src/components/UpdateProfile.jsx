import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice.js';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
export default function UpdateProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {currentUser, loading, error}= useSelector(state => state.user);
    const [form, setForm] = useState({});
    const [verifyPass, setVerifyPass] = useState('');
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const verifyPassword = async (e) => {
        e.preventDefault();
        const url = `${import.meta.env.VITE_API_BACKEND}/api/auth/verify-password`;
        try {
            const res = await fetch(url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({verifyPassword: verifyPass}),
            });
            const data = await res.json();
            if(!data.success){
                dispatch(updateFailure(data.message))
                return console.log(data.message);
            }
            console.log(data.message);
            handleSubmit();
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    const handleSubmit = async () => {
        const url = `${import.meta.env.VITE_API_BACKEND}/api/auth/update-profile`;
        try {
            dispatch(updateStart());
            const res = await fetch(url, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if(!data.success){
                dispatch(updateFailure(data.message));
                console.log(data.message);
            }
            dispatch(updateSuccess(data.user));
            navigate('/menu');
            toast.success(data.message);
        } catch (error) {
            dispatch(updateFailure(error.message))
        }
    }

    useEffect(()=>{
        setForm({name: currentUser.name, email: currentUser.email, bio: currentUser.bio})
    }, [currentUser])
  return (
    <div className='flex justify-center py-3 bg-gray-50'>
      <form onSubmit={verifyPassword} className='p-5 flex flex-col gap-4 w-md bg-white'>
        <h1 className='text-center text-2xl font-semibold pb-5'>Update Information</h1>
        <div className='flex flex-col gap-2 px-5 rounded'>
            <span className='w-25'>Name</span>
            <input type="text" name='name' value={form.name || ''} onChange={handleChange} className='outline rounded px-2 py-1 w-full'/>
        </div>
        <div className='flex flex-col gap-2 px-5 rounded'>
            <span className='w-25'>Email</span>
            <input name='email' type="email" value={form.email || ''} onChange={handleChange} className='outline rounded px-2 py-1 w-full'/>
        </div>
        <div className='flex flex-col gap-2 px-5 rounded'>
            <span className='w-25'>Bio</span>
            <input name='bio' type="text" value={form.bio || ''} onChange={handleChange} className='outline rounded px-2 py-1 w-full'/>
        </div>
        <div className='flex flex-col gap-2 px-5 rounded'>
            <span className='w-25' >New Passwod</span>
            <input name='password' value={form.password || ''} type="text" onChange={handleChange} className='outline rounded px-2 py-1 w-full'/>
            <p className='text-sm  text-green-500'>new password (Optional) field if you want to update</p>
        </div>
        <div className='flex flex-col gap-2 px-5 rounded'>
            <span className='w-25'>Old password</span>
            <input required name='verifyPass' value={verifyPass} onChange={(e)=> setVerifyPass(e.target.value)} type="text" className='outline rounded px-2 py-1 w-full'/>
            {error && <p className='text-sm text-red-500'>{error}</p>}
        </div>
        <div className='px-5 py-2'>
            <button className='w-full bg-black cursor-pointer hover:bg-[#352e2e] text-white py-2 rounded'>{loading? 'loading...': 'Update'}</button>
        </div>
      </form>
    </div>
  )
}
