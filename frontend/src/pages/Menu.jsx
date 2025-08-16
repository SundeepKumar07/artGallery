import { FiGrid, FiUpload, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useState, useEffect } from 'react';
import Dashboard from '../components/menuComponents/Dashboard.jsx';
import Profile from '../components/menuComponents/Profile.jsx';
import UploadArt from '../components/menuComponents/UploadArt.jsx';
import Setting from '../components/menuComponents/Setting.jsx';

export default function Menu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Load active menu from localStorage or default to "dashboard"
  const [activeMenu, setActiveMenu] = useState(() => {
    return localStorage.getItem('activeMenu') || 'dashboard';
  });

  // Save active menu to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('activeMenu', activeMenu);
  }, [activeMenu]);

  const logOut = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BACKEND}/api/auth/sign-out`;
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      dispatch(signInSuccess(null));
      navigate('/');
      toast.success(data.message);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while logging out!");
    }
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadArt />;
      case 'profile':
        return <Profile />;
      case 'setting':
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex gap-3">
      {/* Sidebar */}
      <div className="pl-2 w-15 sm:w-55 pt-20 flex flex-col gap-4 sm:gap-5 items-center sm:items-start sm:pl-7 sticky top-0 h-screen bg-white">
        <SidebarItem
          label="Dashboard"
          icon={<FiGrid className="w-5 h-5" />}
          isActive={activeMenu === 'dashboard'}
          onClick={() => setActiveMenu('dashboard')}
        />
        <SidebarItem
          label="Upload"
          icon={<FiUpload className="w-5 h-5" />}
          isActive={activeMenu === 'upload'}
          onClick={() => setActiveMenu('upload')}
        />
        <SidebarItem
          label="Profile"
          icon={<FiUser className="w-5 h-5" />}
          isActive={activeMenu === 'profile'}
          onClick={() => setActiveMenu('profile')}
        />
        <SidebarItem
          label="Setting"
          icon={<FiSettings className="w-5 h-5" />}
          isActive={activeMenu === 'setting'}
          onClick={() => setActiveMenu('setting')}
        />
        <SidebarItem
          label="Log out"
          icon={<FiLogOut className="w-5 h-5" />}
          onClick={logOut}
        />
      </div>

      {/* Content */}
      <div className="px-3 sm:px-5 pt-5 w-full min-h-screen">
        {renderContent()}
      </div>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ label, icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-2 cursor-pointer transition-transform duration-300 py-2 px-2 rounded-md
        ${isActive ? 'text-blue-500 font-semibold bg-blue-50' : 'hover:scale-105 hover:bg-gray-100'}
      `}
    >
      {icon}
      <span className="hidden sm:block">{label}</span>
    </button>
  );
}