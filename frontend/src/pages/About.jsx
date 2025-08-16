export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        Welcome to <span className="font-semibold">ArtGallery</span> — a
        platform where creativity meets technology. Our mission is to provide
        artists with a space to showcase their talent and connect with art
        lovers around the world.
      </p>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        Whether you’re here to admire, purchase, or get inspired, we believe
        art should be accessible to everyone. Each artwork you see here is a
        unique story told by the artist, captured in a single frame.
      </p>
      <p className="text-lg mb-6 leading-relaxed text-justify">
        This platform is built with passion using the latest web technologies,
        ensuring a seamless experience for both artists and visitors.
      </p>
      <div className="mt-10 text-center">
        <img
          src="https://media.istockphoto.com/id/1316156982/photo/sign-post-showing-direction-to-the-art-gallery-wanderlust-travel-and-holiday-concept.jpg?s=1024x1024&w=is&k=20&c=jJoP2us57HYcWOGD_4zj325SMLvr6y2J40YGxjOv4FQ=" // replace with your image
          alt="Art gallery illustration"
          className="mx-auto rounded-lg shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  );
}