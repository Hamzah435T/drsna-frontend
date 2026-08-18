import { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [health, setHealth] = useState('Checking backend connection...');

  useEffect(() => {
    axios.get('http://localhost:5000/api/health')
        .then((res) => setHealth(res.data.status || 'Backend Connected Successfully!'))
        .catch(() => setHealth('Failed to connect to Backend'));
  }, []);

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="rounded-xl bg-gray-800 p-8 shadow-2xl border border-gray-700 text-center">
          <h1 className="text-2xl font-bold text-blue-400 mb-4">Sprint 0: Health Check</h1>
          <p className="text-gray-300 font-mono bg-gray-900 p-3 rounded-lg">{health}</p>
        </div>
      </div>
  );
}