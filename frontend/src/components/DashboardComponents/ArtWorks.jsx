import { useState } from "react";
import UpdateArt from "./UpdateArt.jsx";
import { useNavigate } from "react-router-dom";

export default function ArtWorks({artWorks, triggerReload}, loading) { 
  const navigate = useNavigate(); 
  const [update, setUpdate] = useState(false);
  const [updateArtWork, setUpdateArtWork] = useState({});
  const handleDelete = async (artwork) => {
    const url =  `${import.meta.env.VITE_API_BACKEND}/api/art/delete-artwork/${artwork._id}`;
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if(!data){
        return console.log(data.message);
      }
      console.log(data.message);
      triggerReload();
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className=''>
      {update?
        <div>
          <button onClick={() => setUpdate(false)} className='w-full text-center text-green-500 mt-3 cursor-pointer'>Back to Dashboard</button>
          <UpdateArt artwork={updateArtWork} />
        </div>
        : <div className='p-2 overflow-hidden'>
          {loading ? <p className='text-2xl'>Loading...</p> : 
          artWorks.length === 0 ? <p className='text-2xl'>Nothing to Show</p> 
          : <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden'>
            {artWorks.map((artwork, index)=>(
              <div key={index} onClick={() => navigate(`/art-detail/${artwork._id}`, { state: artwork })} className='p-3 flex flex-col justify-between shadow-md transition-all hover:scale-103 overflow-hidden h-85 sm:h-85 bg-white'>
                <img src={artwork.imageUrl} alt="art-image" className='w-full h-40 sm:h-40'/>
                <div className='flex flex-col gap-0'>
                  <div className='flex gap-2 text-xl'>
                    <h1 className='font-semibold'>Title:</h1>
                    <p className='truncated'>{artwork.name}</p>
                  </div>
                  <div className='flex gap-2'>
                    <h1 className='font-semibold'>Category:</h1>
                    <p className='truncated'>{artwork.category}</p>
                  </div>
                  <div className=''>
                    <span className='font-semibold pr-2'>Description:</span>
                    <span>{artwork.description.split('', 100).join('')}...</span>
                  </div>
                </div>
                  <div className='flex gap-4'>
                    <button className='text-green-500 cursor-pointer' onClick={(e) => {e.stopPropagation(); setUpdate(true); setUpdateArtWork(artwork)}}>Edit</button>
                    <button className='text-red-500 cursor-pointer' onClick={(e)=>{e.stopPropagation(); handleDelete(artwork)}}>Delete</button>
                  </div>
              </div>
            ))}
          </div>
          }
        </div>
      }
    </div>
  )
}
