import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ArtWorks from '../DashboardComponents/ArtWorks.jsx';
import ViewPurchseRequests from '../DashboardComponents/ViewPurchseRequests.jsx';

export default function Dashboard() {
  const { currentUser } = useSelector(state => state.user);

  const [showArtWorks, setShowArtWorks] = useState(true);
  const [reload, setReload] = useState(false);
  const [artWorks, setArtWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchaseReq, setPurchaseReq] = useState({});

  // Fetch Purchase Requests
  const fetchPurchaseReq = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/visitor/view-requests`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setPurchaseReq(data);
    } catch (error) {
      console.error("Error fetching purchase requests:", error.message);
    }
  };

  // Fetch Artworks
  const fetchArtWorks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BACKEND}/api/art/view/user/artworks`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (!data) {
        console.warn("No artworks found:", data?.message);
        setLoading(false);
        return;
      }

      setArtWorks(data.artworks);
    } catch (error) {
      console.error("Error fetching artworks:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load Data on Mount & Reload
  useEffect(() => {
    fetchArtWorks();
    fetchPurchaseReq();
  }, [reload]);

  return (
    <div className="p-2">
      {/* Header */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Welcome back, {currentUser?.name}</p>

      {/* Stats Cards */}
      <div className="flex gap-2">
        <div
          onClick={() => setShowArtWorks(true)}
          className="rounded h-30 flex flex-col justify-center gap-2 px-5 my-2 bg-white shadow-md w-55 cursor-pointer"
        >
          <p className="font-semibold">Total Artworks</p>
          <p className="text-2xl flex items-center">{artWorks.length}</p>
        </div>

        <div
          onClick={() => {
            setShowArtWorks(false);
          }}
          className="rounded h-30 flex flex-col justify-center gap-2 px-5 my-2 bg-white shadow-md w-55 cursor-pointer"
        >
          <p className="font-semibold">Purchase Requests</p>
          <p className="text-2xl flex items-center">{purchaseReq.totalRequests}</p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="w-80 flex gap-1 bg-gray-200 p-1 rounded">
        <button
          onClick={() => setShowArtWorks(true)}
          className={`w-40 py-1 ${showArtWorks ? 'bg-white' : ''} rounded cursor-pointer`}
        >
          My ArtWorks
        </button>
        <button
          onClick={() => setShowArtWorks(false)}
          className={`w-40 py-1 ${!showArtWorks ? 'bg-white' : ''} rounded cursor-pointer`}
        >
          Purchase Requests
        </button>
      </div>

      {/* Content */}
      {showArtWorks ? (
        <ArtWorks
          loading={loading}
          artWorks={artWorks}
          triggerReload={() => setReload(prev => !prev)}
        />
      ) : (
        <ViewPurchseRequests purchaseReq={purchaseReq} />
      )}
    </div>
  );
}