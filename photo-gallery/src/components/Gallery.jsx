import { useState, useReducer, useEffect, useCallback, useMemo } from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos";
import { favouriteReducer } from "../reducers/favouriteReducer";
import PhotoCard from "./PhotoCard";

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favourites, dispatch] = useReducer(favouriteReducer, [], () => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleSearch = useCallback((e) => setSearch(e.target.value), []);

  const toggleFav = useCallback((id) => {
    dispatch({ type: "TOGGLE_FAV", payload: id });
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesSearch = photo.author
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "favourites" ? favourites.includes(photo.id) : true;
      return matchesSearch && matchesFilter;
    });
  }, [photos, search, activeFilter, favourites]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
        <p className="text-neutral-400 text-sm tracking-widest uppercase">
          Loading gallery
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-1250 flex items-center justify-center">
        <p className="text-rose-400 text-sm border border-rose-500/30 bg-rose-500/10 px-6 py-3 rounded-xl">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">

      
      <div className="px-6 pt-12 pb-8 max-w-7xl mx-auto">
        <p className="text-violet-600 text-4xl uppercase tracking-[0.3em] font-medium mb-2 text-center decoration-solid-5">
          Photo-Gallery
        </p>
        <h1 className="text-violet-700  text-xl font-bold tracking-tight mb-1">
           IMAGE REPOSITORY
        </h1>
        <p className="text-neutral-400 text-sm">{filteredPhotos.length} photos</p>
      </div>

      
      <div className="px-6 max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">

        
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by author..."
            value={search}
            onChange={handleSearch}
            className="w-full bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/30 transition-all duration-200"
          />
        </div>

        <div className="flex gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
          {["all", "favourites"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-200
                ${
                  activeFilter === f
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "text-neutral-400 hover:text-white"
                }`}
            >
              {f === "favourites" ? `♥ ${favourites.length}` : "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 max-w-7xl mx-auto pb-16">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-24 text-neutral-600">
            <p className="text-4xl mb-3">✦</p>
            <p className="text-sm">No photos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFav={favourites.includes(photo.id)}
                toggleFav={toggleFav}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
