'use client';
import { useState } from 'react';

export default function Home() {
  const [coins, setCoins] = useState(0);
  const [mints, setMints] = useState(0);
  const [gems, setGems] = useState(0);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-1">Coinvert</h1>
      <p className="text-gray-500 mb-6">
        Earn in one game, spend in another.
      </p>

      <section className="grid grid-cols-3 gap-4 max-w-2xl">
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Tap Rush coins</p>
          <p className="text-2xl font-bold">{coins}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Mints</p>
          <p className="text-2xl font-bold">{mints}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <p className="text-sm text-gray-500">Gem Dash gems</p>
          <p className="text-2xl font-bold">{gems}</p>
        </div>
      </section>
    </main>
  );
}