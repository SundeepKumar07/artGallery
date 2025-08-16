import { useEffect, useState } from "react";
import ShowCards from "../components/ShowCards";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import {useSelector} from 'react-redux';

export default function Home() {
  const {currentUser} = useSelector(state=>state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [natureArtworks, setNatureArtworks] = useState({ artworks: [], pagination: {} });
  const [abstractArtworks, setAbstractArtworks] = useState({ artworks: [], pagination: {} });
  const [paintingArtworks, setPaintingArtworks] = useState({ artworks: [], pagination: {} });

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const [natureRes, paintingRes, abstractRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BACKEND}/api/visitor/search-request?limit=4&searchTerm=nature`),
          fetch(`${import.meta.env.VITE_API_BACKEND}/api/visitor/search-request?limit=4&searchTerm=painting`),
          fetch(`${import.meta.env.VITE_API_BACKEND}/api/visitor/search-request?limit=4&searchTerm=abstract`)
        ]);

        const [natureData, paintingData, abstractData] = await Promise.all([
          natureRes.json(),
          paintingRes.json(),
          abstractRes.json()
        ]);

        setNatureArtworks(natureData);
        setPaintingArtworks(paintingData);
        setAbstractArtworks(abstractData);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  const CategorySection = ({ title, results, term }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col px-5 gap-2 pt-3"
    >
      <h1 className="pl-2 text-3xl text-gray-900 font-bold border-l-4 border-green-500">{title}</h1>
      <ShowCards results={results} />
      <div
        onClick={() => navigate(`/search?searchTerm=${term}`)}
        className="group flex gap-2 items-center my-3 rounded-lg w-fit py-2 px-3 cursor-pointer text-green-600 font-medium hover:bg-green-50 transition"
      >
        <span>See More</span>
        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 h-[90vh] overflow-hidden">
          <img
            src="https://media.istockphoto.com/id/1398809360/photo/people-discussing-art.jpg?s=612x612&w=0&k=20&c=fz_fidFJgpMeaCiO2XhOlqkwYawaHuP4uut5bO2cRA8="
            alt="Gallery hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-widest text-green-300">Curated Art Marketplace</p>
            <h1 className="mt-3 text-5xl md:text-6xl font-extrabold leading-tight">
              Discover Art That Speaks to Your Soul
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Explore a curated selection of unique, hand-crafted artworks from talented creators worldwide.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/search"
                className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow hover:bg-green-600 transition"
              >
                Explore Artworks
              </Link>
              {!currentUser && 
                <Link
                  to="/sign-in"
                  className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
                >
                  Sell Your Art
                </Link>
              }
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <div className="space-y-12 py-8 bg-gray-50">
        {loading ? (
          <p className="text-center py-10">Loading...</p>
        ) : (
          <>
            <h1 className="text-3xl text-gray-900 font-bold text-center">What We Offer</h1>
            <CategorySection title="Nature" results={natureArtworks} term="nature" />
            <CategorySection title="Abstract" results={abstractArtworks} term="abstract" />
            <CategorySection title="Painting" results={paintingArtworks} term="painting" />
          </>
        )}
      </div>

      {/* CTA */}
      <section className="relative isolate mt-10">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=1800"
            alt="CTA background"
            className="h-[50vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="mx-auto max-w-4xl px-4 py-20 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold">Start Your Art Journey Today</h2>
          <p className="mt-3 text-white/90">
            Join a growing community of art lovers and creators. Whether you’re buying, selling, or just exploring—you belong here.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              to="/search"
              className="rounded-full bg-green-500 px-6 py-3 font-semibold text-white shadow hover:bg-green-600 transition"
            >
              Explore Now
            </Link>
            <Link
              to="/sign-in"
              className="rounded-full border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
            >
              Sell Your Artwork
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-10">
        <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg">ArtGallery</h3>
            <p className="mt-2 text-sm text-gray-400">
              Curated art marketplace connecting collectors with creators.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/search" className="hover:text-white">Explore</Link></li>
              {!currentUser && <li><Link to="/sign-in" className="hover:text-white">Sell Art</Link></li>}
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Stay in the loop</h4>
            <p className="text-sm text-gray-400">Get updates on new drops, features, and artist spotlights.</p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2">
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-full bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-white hover:bg-green-600 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} ArtGallery — All rights reserved.
        </div>
      </footer>
    </div>
  );
}