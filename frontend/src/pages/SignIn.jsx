import { Link, useNavigate } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js'
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const navigate = useNavigate();
  const [loginButton, setLoginButton] = useState(true);
  const [form , setForm] = useState({name: '', email: '', password: ''});
  const dispatch = useDispatch();
  const {loading, error, currentUser} = useSelector(state => state.user);
  //ONCHANGE FUNCTION
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  //HANDLE SUBMIT
  const handleSubmit = async (e) =>{
    e.preventDefault();
    dispatch(signInStart());
    const url = loginButton
    ? `${import.meta.env.VITE_API_BACKEND}/api/auth/sign-in`
    : `${import.meta.env.VITE_API_BACKEND}/api/auth/sign-up`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginButton
          ? {email: form.email, password: form.password} 
          : form
        ),
      })
      const data = await res.json();
      if(!data.success){
        dispatch(signInFailure(data.message));
        return console.log(data.message)
      }
      dispatch(signInSuccess(data.user));
      navigate('/menu');
      toast.success(data.message);
    } catch (error) {
      dispatch(signInFailure(error.message))
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-col gap-2 bg-gray-50 min-h-screen justify-center items-center">
      <div className="flex items-center justify-center">
        <button onClick={() => navigate('/')} className='hover:cursor-pointer'>
          <FiArrowLeft className="w-8 h-4 justify-center"/>
        </button>
        <div>Back to welcome page</div>
      </div>

      <div className='flex items-center justify-center hover:cursor-pointer bg-white rounded'>
        <span className={`py-1 px-18 sm:px-22 text-xl ${loginButton && 'bg-gray-200'}`} onClick={()=>setLoginButton(true)}>Sign in</span>
        <span className={`py-1 px-18 sM:px-22 text-xl ${!loginButton && 'bg-gray-200'}`} onClick={()=>setLoginButton(false)}>Sign Up</span>
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-6 py-8 px-5 bg-white sm:w-113 w-105 rounded">
        <div>
          <h1 className="text-2xl">{loginButton? 'Login': 'Create Account'}</h1>
          <p className="text-sm">Enter you credentials to access your account</p>
        </div>
        {!loginButton && 
          <div className="flex flex-col gap-1">
            <label className="">Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="outline px-2 py-1 rounded"/>
          </div>
        }
        <div className="flex flex-col gap-1">
          <label className="">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="outline px-2 py-1 rounded"/>
        </div>
        <div className="flex flex-col gap-1">
          <label className="">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="py-1 outline px-2 rounded"/>
          {error && <p className="text-sm text-red-500">{error}</p> }
          <Link className="text-sm text-green-600">forget password</Link>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-black text-white py-2 rounded-lg hover:cursor-pointer hover:bg-[#2e2626]">{loading? 'loading...' : loginButton? 'Sign-in': 'Sign-up'}</button>
          <OAuth/>
        </div>
      </form>
    </div>
  )
}
