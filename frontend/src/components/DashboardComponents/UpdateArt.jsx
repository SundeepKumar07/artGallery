import { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";

export default function UploadArt({artwork}) {
  const navigate = useNavigate();
  const fileRef = useRef();
  const [form, setForm] = useState({name: artwork.name, description: artwork.description, category: artwork.category, imageUrl: artwork.imageUrl});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
  }
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if(file){
        const imageFormData = new FormData();
        imageFormData.append('file', file);
        imageFormData.append('upload_preset', 'profile-pic');
        const cloundiaryUrl = import.meta.env.VITE_CLOUDINARY_API;
        const res = await fetch(cloundiaryUrl, {
            method: 'POST',
            body: imageFormData,
        });
        const data = await res.json();
        if(!data){
            setError("Something went wrong");
            setLoading(false);
            return console.log("cloud error");
        }
        // setForm({...form, imageUrl: data.secure_url});
        setForm({...form, imageUrl: data.secure_url});
      }
      const url = `${import.meta.env.VITE_API_BACKEND}/api/art/update-artwork/${artwork._id}`;
      const updateRes = await fetch(url, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const updateData = await updateRes.json();
      if(!updateData){
        setLoading(false);
        setError(updateData.message);
        return console.log(updateData.message);
      }
      console.log(updateData.message);
      setLoading(false);
      setSuccess(updateData.message);
      toast.success(updateData.message);
      setForm({name: '', description: '', category: ''});
      setFile(null);
    } catch (error) {
        setError(error.message);
        setLoading(false);
        return console.log(error.message);
    }
  }

  return (
    <div className='bg-gray-50 h-screen pl-5'>
    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-2'>
      <div className='flex flex-col'>
        <h1 className='text-2xl font-semibold'>Update Artwork</h1>
        <p className='text-sm'>Change artwork to upudate your gallery</p>
      </div>
      <div className='flex flex-col'>
        <label className='text-xl font-semibold'>Title</label>
        <input name='name' value={form.name} onChange={handleChange} placeholder='Enter awtwork title' className='w-full outline rounded px-3 py-1' type="text"/>
      </div>
      <div className='flex flex-col'>
        <label className='text-xl font-semibold'>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder='Describe your artwork' className='outline h-20 rounded'></textarea>
      </div>
      <div className='flex flex-col'>
        <label className='text-xl font-semibold'>Category</label>
        <input name='category' value={form.category} onChange={handleChange} placeholder='Abstract, Nature, Portrait etc' className='w-full outline rounded px-3 py-1' type="text"/>
      </div>
      <div className='flex flex-col'>
        <label className='text-xl font-semibold'>image</label>
        <div className='flex gap-2'>
          <input onChange={handleImgChange} ref = {fileRef} className='outline rounded px-3 py-1 w-60' type="file"/>
          <button type='button' onClick={() => fileRef.current.click()} className='cursor-pointer px-2 hover:bg-green-600 bg-green-500'>Upload</button>
        </div>
        <p className='text-green-500 text-sm'>(Optional) if you want to upload a new image</p>
        {error ? <p className='text-red-500 text-sm'>{error}</p> : <p className='text-green-500 text-sm'>{success}</p>}
      </div>
      <div className=''>
        <button className='cursor-pointer w-full sm:w-50 py-1 px-2 mt-2 rounded bg-black hover:bg-[#3a2f2f] text-white'>{loading? 'loading...' : 'Update Artwork'}</button>
      </div>
    </form>
    </div>
  )
}
