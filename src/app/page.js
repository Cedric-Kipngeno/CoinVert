'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function Home() {
  const [coins, setCoins] = useState(0);
  const [mints, setMints] = useState(0);
  const [gems, setGems] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Coinvert</h1>
          <p className="text-gray-500">Earn in one game, spend in another.</p>
        </div>

        {user ? (
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Logged in as {user.user_metadata?.username || user.email}
            </p>
            <button onClick={handleLogout} className="text-sm underline">
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login" className="text-sm underline">
            Log in
          </Link>
        )}
      </div>

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