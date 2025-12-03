const API = import.meta.env.VITE_API_URL;

fetch(`${API}/api/video-feed`)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
