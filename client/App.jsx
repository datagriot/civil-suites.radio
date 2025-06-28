import { useEffect, useState } from 'react';
import UploadForm from './components/UploadForm';
import axios from 'axios';

export default function App() {
  const [tracks, setTracks] = useState([]);

  const refreshTracks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/tracks');
      setTracks(response.data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  useEffect(() => {
    refreshTracks();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f1ea] text-[#2b2b2b] font-mono">
      <header className="text-center py-10">
        <h1 className="text-5xl font-bold tracking-wide text-purple-800">CIVIL SUITES</h1>
        <p className="text-xl text-gray-600">the architectural unraveling of marriage.</p>
      </header>

      <main className="px-6 md:px-20 space-y-12">
        <UploadForm refreshTracks={refreshTracks} />

        <div className="bg-purple-100 p-4 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-4 text-purple-700">Tracklist</h3>
          <ul className="space-y-3">
            {tracks.map((track) => (
              <li key={track.id} className="flex items-center justify-between p-2 rounded-lg bg-white shadow">
                <div className="flex gap-3 items-center">
                  <img src={`http://localhost:3001/${track.artwork_url}`} alt={track.title} className="w-12 h-12 rounded object-cover" />
                  <div>
                    <div className="font-semibold text-sm">{track.title}</div>
                    <div className="text-xs text-gray-600">{track.duration}</div>
                  </div>
                </div>
                <audio controls src={`http://localhost:3001/${track.audio_url}`} className="w-40" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
