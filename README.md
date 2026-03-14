📸 Photo Gallery
A clean, responsive Photo Gallery web app built with React, Vite, and Tailwind CSS. Fetches real photos from a public API, supports live author search, and lets you save favourites that persist across page refreshes.

🚀 Getting Started
1. Extract the zip and open the folder
bashcd photo-gallery
2. Install dependencies
bashnpm install
3. Start the dev server
bashnpm run dev
Then open http://localhost:5173 in your browser.

✨ Features

Photo Grid — fetches 30 photos from the Picsum Photos API and displays them in a responsive grid
Live Search — filter photos by author name in real time, no API re-calls
Favourites — toggle any photo as a favourite using the heart button
Persistent Favourites — favourites are saved to localStorage and survive page refreshes
Loading & Error States — animated spinner while loading, friendly error message on failure
Responsive Layout — 4 columns on desktop, 2 on tablet, 1 on mobile


🗂️ Project Structure
photo-gallery/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Gallery.jsx       # Main layout: search, filter tabs, photo grid
    │   └── PhotoCard.jsx     # Individual photo card with hover effects
    ├── hooks/
    │   └── useFetchPhotos.js # Custom hook for API fetching
    └── reducers/
        └── favouriteReducer.js  # useReducer logic for toggling favourites

🛠️ Tech Stack
ToolPurposeReact 18UI framework (functional components only)Vite 6Build tool and dev serverTailwind CSS 4All styling — no external UI libraries

⚛️ React Concepts Used
HookWhereWhyuseStateGalleryTracks search input and active filter tabuseReducerGalleryManages the favourites listuseEffectGallery, useFetchPhotosSyncs localStorage, triggers fetch on mountuseCallbackGalleryStable references for search handler and toggleFavuseMemoGalleryEfficiently computes filtered photo listCustom HookuseFetchPhotosEncapsulates all fetch logic away from the UI

🌐 API
Photos are fetched from the free Picsum Photos API:
GET https://picsum.photos/v2/list?limit=30
Each photo object returns an id, author, and download_url among other fields.

📦 Build for Production
bashnpm run build
Output will be in the dist/ folder, ready to deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

🙌 Credits

Photos provided by Picsum Photos
Built with React, Vite, and Tailwind CSS
