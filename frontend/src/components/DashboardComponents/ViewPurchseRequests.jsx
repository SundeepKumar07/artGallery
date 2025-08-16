
export default function ViewPurchaseRequests({ purchaseReq }) {

  return (
    <div className="mt-6 space-y-8">
      {purchaseReq.artworks.map((artwork, i) => (
        <div
          key={artwork._id}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all hover:shadow-2xl"
        >
          {/* Artwork Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4">
            <h1 className="text-2xl font-bold">
              🎨 Artwork {i + 1}: {artwork.name}
            </h1>
          </div>

          {/* Artwork Details */}
          <div className="flex flex-col md:flex-row gap-6 p-6">
            {/* Image */}
            <div className="flex-shrink-0 w-full md:w-1/3">
              <img
                src={artwork.imageUrl || 'https://via.placeholder.com/300'}
                alt={artwork.name}
                className="rounded-lg w-full h-64 object-cover shadow-md"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 space-y-4">
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Category: <span className="font-normal">{artwork.category}</span>
                </p>
                <p className="text-gray-600 mt-2">{artwork.description}</p>
              </div>
              <p className="text-sm text-gray-400">
                Total Customers: {artwork.visitors.length}
              </p>
            </div>
          </div>

          {/* Visitors */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h2 className="text-lg font-bold mb-4">👥 Interested Customers</h2>
            <div
              className={`grid gap-4 ${
                artwork.visitors.length === 1
                  ? 'grid-cols-1'
                  : artwork.visitors.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {artwork.visitors.map((v, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-indigo-600 mb-2">
                    Customer {index + 1}
                  </h3>
                  <p>
                    <span className="font-medium">Name:</span> {v.name}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {v.phoneNo}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {v.email}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{v.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}