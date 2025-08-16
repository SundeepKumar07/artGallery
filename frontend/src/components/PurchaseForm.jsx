import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function PurchaseForm({purchaseForm, handleChange, result, onClose, showPurchaseForm, artworkId }) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_BACKEND}/api/visitor/create-request/${artworkId}`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchaseForm)      
      });
      const data = await res.json();
      if(!data){
        console.log(data.message);
      }
      navigate('/menu');
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={`w-full flex justify-center fixed inset-0 bg-black/50 ${showPurchaseForm? 'z-50': 'hidden'} py-2`}>
      <form onSubmit={handleSubmit} className="bg-white px-5 flex flex-col rounded-lg">
        <div className="mb-4 flex flex-col gap-1 py-5">
          <span onClick={()=>onClose()} className="absolute top-3 right-5 text-2xl text-white font-bold cursor-pointer" title="close">X</span>
          <h1 className="text-2xl font-bold">Purchase Request</h1>
          <p className="w-100">Send a Request to the Artist to Purchase {`"${result.category} Emotion"`}</p>
        </div>
        <div className="flex flex-col gap-2 w-100">
          <label className="font-semibold text-xl">Full Name:</label>
          <input name='name' value={purchaseForm.name} onChange={handleChange} required placeholder="Enter your Name" className="outline py-2 px-4 text-xl rounded-lg" type="text"/>
        </div>
        <div className="flex flex-col gap-2 w-100">
          <label className="font-semibold text-xl">Email:</label>
          <input name='email' value={purchaseForm.email} onChange={handleChange} required placeholder="example@gmail.com" className="outline py-2 px-4 text-xl rounded-lg" type="email"/>
        </div>
        <div className="flex flex-col gap-2 w-100">
          <label className="font-semibold text-xl">Contact No:</label>
          <input name='phoneNo' value={purchaseForm.phoneNo} onChange={handleChange} required placeholder=" 03XXXXXXXXX" className="outline py-2 px-4 text-xl rounded-lg" type="text"/>
        </div>
        <div className="flex flex-col gap-2 w-100">
          <label className="font-semibold text-xl">Message:</label>
          <textarea name='message' value={purchaseForm.message} onChange={handleChange} required placeholder="Enter your Message" className="outline py-2 px-4 text-xl rounded-lg"/>
        </div>
        <button className="text-2xl bg-black text-white p-2 rounded-lg font-semibold mt-4 cursor-pointer hover:bg-[#252121]">Send</button>
      </form>
    </div>
  )
}