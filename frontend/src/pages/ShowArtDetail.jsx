import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PurchaseForm from "../components/PurchaseForm.jsx";
import { useSelector } from "react-redux";
export default function ShowArtDetail() {
  const { artworkId } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ name: '', imageUrl: '', description: '', category: '', createdAt: '' });
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [purchaseForm, setPurchaseForm] = useState({name: '', email: '', phoneNo: '', message: ''});

  const handleChange = (e) => {
    setPurchaseForm({
      ...purchaseForm,  // ✅ lowercase state variable
      [e.target.name]: e.target.value
    });
  }
  console.log(purchaseForm);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_API_BACKEND}/api/art/get-artwork/${artworkId}`;
        const res = await fetch(url);
        const data = await res.json();
        if(!data){
          console.log(data.message);
        }
        setResult(data.artwork);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [artworkId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Loading artwork details...
      </div>
    );
  }

  return (
    <div className={`w-full bg-gray-50`}>
      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        {result.imageUrl && 
          <img
            src={result.imageUrl}
            alt={result.name}
            className="w-full h-full object-cover"
          />
        }
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end px-8 pb-10">
          <p className="text-sm uppercase tracking-widest text-gray-300">{result.category}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{result.name}</h1>
          <p className="text-gray-400 mt-2 text-sm">Posted on {new Date(result.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-10">
        {/* Main Description */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Description</h2>
          <p className="text-gray-700 leading-relaxed">{result.description}</p>
        </div>

        {/* Side Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Artwork Info</h3>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Category:</span> {result.category}</p>
            <p><span className="font-medium">Created:</span> {new Date(result.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      {!currentUser &&
        <div className="bg-gray-900 py-12 mt-10">
          <div className="max-w-6xl mx-auto text-center text-white space-y-4">
            <h3 className="text-2xl font-semibold">Like what you see?</h3>
            <p className="text-gray-300">Contact the artist for collaboration or purchase details.</p>
            <button onClick={()=>setShowPurchaseForm(true)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">
              Request for Sale
            </button>
          </div>
        </div>
      }

      {showPurchaseForm && (
        <PurchaseForm
          purchaseForm={purchaseForm}
          handleChange={handleChange}
          result={result}
          onClose={() => setShowPurchaseForm(false)}
          showPurchaseForm = {showPurchaseForm}
          artworkId = {artworkId}
        />
      )}
    </div>
  );
}
