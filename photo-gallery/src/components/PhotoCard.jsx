
export default function PhotoCard({ photo, isFav, toggleFav }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-neutral-900 shadow-lg hover:shadow-2xl hover:shadow-black/40 transition-all duration-500 hover:-translate-y-2 cursor-pointer">
      <div className="relative overflow-hidden h-60">
        <img
          src={photo.download_url}
          alt={photo.author}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium mb-0.5">
            Photographer
          </p>
          <p className="text-white text-sm font-semibold truncate">{photo.author}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFav(photo.id);
          }}
          aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full
            transition-all duration-300 backdrop-blur-md border
            ${
              isFav
                ? "bg-rose-500/90 border-rose-400/50 scale-110 shadow-lg shadow-rose-600/50"
                : "bg-black/30 border-white/20 opacity-0 group-hover:opacity-100 hover:bg-black/50 hover:scale-110"
            }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              isFav ? "fill-white stroke-white" : "fill-none stroke-white stroke-2"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
      <div className="px-4 py-3 flex items-center justify-between bg-neutral-900">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-[9px] text-white font-bold uppercase">
            {photo.author.charAt(0)}
          </div>
          <p className="text-neutral-300 text-xs font-medium truncate max-w-[130px]">
            {photo.author}
          </p>
        </div>
        <span className="text-neutral-600 text-[10px] font-mono">
          #{String(photo.id).padStart(3, "0")}
        </span>
      </div>
    </div>
  );
}
