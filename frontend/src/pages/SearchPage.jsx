import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShowCards from "../components/ShowCards.jsx";

export default function ArtWorks() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState({ artworks: [], pagination: {} });

  const changePage = (newPage) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", newPage);
    navigate(`?${urlParams.toString()}`, { replace: false }); // ✅ updates location.search
    setPage(newPage);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get("page");
    if (pageFromUrl) setPage(Number(pageFromUrl));

    const fetchResults = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_API_BACKEND}/api/visitor/search-request?${urlParams.toString()}`;
        const res = await fetch(url);
        const data = await res.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchResults();
  }, [location.search]);

  return (
    <div className="pt-3 px-10">
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <ShowCards results={results}/>
      )}
      <div className="flex gap-2 justify-between mt-5">
        <button
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={!results.pagination?.hasNextPage}
          onClick={() => changePage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}