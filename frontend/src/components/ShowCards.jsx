import { useNavigate } from "react-router-dom";

export default function ShowCards({results}) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {results?.artworks?.map((artwork, index) => (
            <div
              onClick={() => navigate(`/art-detail/${artwork._id}`, { state: artwork })}
              key={index}
              className="p-3 flex flex-col gap-2 shadow-md transition-all hover:scale-103 bg-white"
            >
              <img src={artwork.imageUrl} alt="art-image" className="w-full h-40" />
              <div>
                <div className="flex gap-2 text-xl">
                  <h1 className="font-semibold">Title:</h1>
                  <p className="truncate">{artwork.name}</p>
                </div>
                <div className="flex gap-2">
                  <h1 className="font-semibold">Category:</h1>
                  <p className="truncate">{artwork.category}</p>
                </div>
                <div>
                  <span className="font-semibold pr-2">Description:</span>
                  <p>{artwork.description.slice(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}
