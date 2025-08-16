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
    const url = `${import.meta.env.VITE_API_BACKEND}/api/auth/sign-out`;
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await res.json();
    if (!data.success) {
      console.log(data.message);
    }
    dispatch(signInSuccess(null));
    navigate('/');
    toast.success(data.message);
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
      <div className="pl-2 w-15 sm:w-55 pt-20 list-none flex gap-4 sm:gap-5 items-center sm:items-start sm:pl-7 flex-col sticky top-0 h-screen bg-white">
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
    <li
      onClick={onClick}
      className={`list-none relative group hover:scale-105 transition-transform duration-300 ${
        isActive ? 'text-blue-500 font-semibold' : ''
      }`}
    >
      <span className="flex gap-2 items-center cursor-pointer">
        {icon}
        <span className="hidden sm:block">{label}</span>
      </span>
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all ${
          isActive ? 'w-5 sm:w-full' : 'w-0 group-hover:w-5 group-hover:sm:w-full'
        }`}
      ></span>
    </li>
  );
}
