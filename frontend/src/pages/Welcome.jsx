import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, HandHeart, Sparkles } from "lucide-react";

// ---- Mock data (replace with your API data) ----
const CATEGORIES = [
  { name: "Abstract", image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200" },
  { name: "Landscape", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200" },
  { name: "Portrait", image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?q=80&w=1200" },
  { name: "Digital", image: "https://images.unsplash.com/photo-1536766820879-059fec98ec1e?q=80&w=1200" },
  { name: "Minimal", image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1200" },
  { name: "Modern", image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200" },
];

const TRENDING = [
  {
    id: "1",
    title: "Velvet Echoes",
    category: "Abstract",
    price: 249,
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200",
    description: "Rich textures and sweeping hues that move like music.",
  },
  {
    id: "2",
    title: "Golden Valley",
    category: "Landscape",
    price: 199,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200",
    description: "A warm, quiet valley caught at golden hour.",
  },
  {
    id: "3",
    title: "Digital Bloom",
    category: "Digital",
    price: 179,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200",
    description: "Floral geometry in soft neon tones.",
  },
  {
    id: "4",
    title: "Still Blue",
    category: "Minimal",
    price: 149,
    image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?q=80&w=1200",
    description: "A study in calm and negative space.",
  },
  {
    id: "5",
    title: "Portrait of Light",
    category: "Portrait",
    price: 329,
    image: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?q=80&w=1200",
    description: "Light and shadow shaping quiet confidence.",
  },
  {
    id: "6",
    title: "Neon City",
    category: "Modern",
    price: 279,
    image: "https://images.unsplash.com/photo-1536766820879-059fec98ec1e?q=80&w=1200",
    description: "A modern palette of motion and glass.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amira Khan",
    quote:
      "The artwork I received was even more stunning in person. Buying was seamless and I love supporting artists directly.",
  },
  {
    name: "Diego Martins",
    quote:
      "Curation is top-notch. I discovered styles I didn't know I'd love. Shipping was fast and safe.",
  },
  {
    name: "Leena Kapoor",
    quote:
      "As an artist, I finally feel seen. The platform highlights my work beautifully and buyers are lovely to work with.",
  },
];

const SPOTLIGHT = {
  name: "Aanya Verma",
  bio: "Aanya explores memory and movement through layered textures and restrained palettes.",
  image: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200",
};

// ---- UI Helpers ----
const SectionHeader = ({ eyebrow, title, subtitle, center }) => (
  <div className={`mb-8 ${center ? "text-center" : ""}`}>
    {eyebrow && (
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{eyebrow}</p>
    )}
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
    {subtitle && <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

const CategoryCard = ({ name, image }) => (
  <Link to={`/explore?category=${encodeURIComponent(name)}`} className="group relative block overflow-hidden rounded-2xl shadow-sm">
    <img src={image} alt={`${name} art`} className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    <div className="absolute bottom-3 left-3">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-900">
        <Sparkles size={16} /> {name}
      </span>
    </div>
  </Link>
);

const ArtworkCard = ({ art }) => (
  <Link to={`/art/${art.id}`} className="group rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="relative">
      <img src={art.image} alt={art.title} className="h-56 w-full object-cover" />
      <div className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-xs font-medium">{art.category}</div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 line-clamp-1">{art.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{art.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">${art.price}</span>
        <span className="inline-flex items-center gap-1 text-sm text-indigo-600 group-hover:gap-2 transition-all">
          View <ArrowRight size={16} />
        </span>
      </div>
    </div>
  </Link>
);

const Testimonial = ({ name, quote }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-2 flex items-center gap-1 text-amber-500">
      <Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} /><Star size={16} />
    </div>
    <p className="text-gray-700">“{quote}”</p>
    <p className="mt-3 text-sm font-semibold text-gray-900">— {name}</p>
  </div>
);

// ---- Page ----
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1800"
            alt="Gallery hero"
            className="h-[80vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-sm uppercase tracking-widest text-white/80">Curated Art Marketplace</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
              Discover Art That Speaks to Your Soul
            </h1>
            <p className="mt-4 text-lg text-white/90">
              Explore a curated selection of unique, hand-crafted artworks from talented creators worldwide.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/explore"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-gray-900 shadow hover:shadow-md"
              >
                Explore Artworks
              </Link>
              <Link
                to="/sell"
                className="rounded-2xl border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white/10"
              >
                Sell Your Art
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Browse"
          title="Find Your Style"
          subtitle="From modern abstracts to timeless classics, jump into categories that match your taste."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.name} {...c} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionHeader
            eyebrow="Why Us"
            title="Why Collectors & Artists Choose Us"
            subtitle="We combine careful curation with a seamless buying and selling experience."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border bg-gray-50 p-6">
              <div className="mb-3 inline-flex rounded-full bg-indigo-100 p-3"><Sparkles /></div>
              <h3 className="font-semibold text-gray-900">Curated Quality</h3>
              <p className="mt-1 text-gray-600">Every piece is reviewed to ensure exceptional craftsmanship.</p>
            </div>
            <div className="rounded-2xl border bg-gray-50 p-6">
              <div className="mb-3 inline-flex rounded-full bg-rose-100 p-3"><HandHeart /></div>
              <h3 className="font-semibold text-gray-900">Direct Artist Support</h3>
              <p className="mt-1 text-gray-600">Buy directly from creators and support their journey.</p>
            </div>
            <div className="rounded-2xl border bg-gray-50 p-6">
              <div className="mb-3 inline-flex rounded-full bg-emerald-100 p-3"><Truck /></div>
              <h3 className="font-semibold text-gray-900">Worldwide Delivery</h3>
              <p className="mt-1 text-gray-600">From our gallery to your doorstep, safely and securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Trending"
          title="Trending This Week"
          subtitle="Our community’s most loved pieces—hand-picked and ready to inspire."
          center
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING.map((art) => (
            <ArtworkCard key={art.id} art={art} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/explore" className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 font-semibold text-gray-900 hover:bg-gray-100">
            View All Artworks <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Artist spotlight */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader
            eyebrow="Spotlight"
            title="Meet the Artist"
            subtitle="Each week we showcase a creator whose work is moving the community."
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img src={SPOTLIGHT.image} alt={SPOTLIGHT.name} className="h-80 w-full object-cover rounded-2xl" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{SPOTLIGHT.name}</h3>
              <p className="mt-2 text-gray-700">{SPOTLIGHT.bio}</p>
              <Link to="/artist/aanya-verma" className="mt-6 inline-block rounded-2xl bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-black">
                View Artist’s Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow="Community"
          title="Loved by Collectors & Creators"
          subtitle="Real stories from people who found the perfect match."
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Testimonial key={i} {...t} />
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative isolate">
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
            <Link to="/explore" className="rounded-2xl bg-white px-5 py-3 font-semibold text-gray-900 shadow hover:shadow-md">Explore Now</Link>
            <Link to="/sell" className="rounded-2xl border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white/10">Sell Your Artwork</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg">ArtGallery</h3>
            <p className="mt-2 text-sm text-gray-400">Curated art marketplace connecting collectors with creators.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/search" className="hover:text-white">Explore</Link></li>
              <li><Link to="/sign-in" className="hover:text-white">Sell Art</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Stay in the loop</h4>
            <p className="text-sm text-gray-400">Get updates on new drops, features, and artist spotlights.</p>
            <form onSubmit={(e)=>e.preventDefault()} className="mt-3 flex gap-2">
              <input type="email" required placeholder="Your email" className="w-full rounded-xl bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20" />
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">© {new Date().getFullYear()} ArtGallery — All rights reserved.</div>
      </footer>
    </div>
  );
}
