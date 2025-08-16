import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  const [openMenu, setOpenMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    navigate(`/search?${urlParams.toString()}`);
    setOpenMenu(false); // close menu after search on mobile
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) setSearchTerm(searchTermFromUrl);
  }, [location.search]);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    currentUser
      ? { name: 'Dashboard', path: '/menu' }
      : { name: 'Sign in', path: '/sign-in' },
  ];

  return (
    <nav className="bg-white shadow-md py-3 px-4 sm:px-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          🎨ArtGallery
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-gray-700 text-2xl focus:outline-none"
          onClick={() => setOpenMenu(!openMenu)}
          aria-label="Toggle menu"
        >
          {openMenu ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative group text-gray-600 hover:text-blue-500 transition"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* Search bar */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1 border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <FaSearch className="text-gray-500" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="flex flex-col gap-4 mt-4 sm:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpenMenu(false)}
              className="text-gray-600 hover:text-blue-500 transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Search bar mobile */}
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-1 w-full border rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            >
              <FaSearch className="text-gray-500" />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}