'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      });
      if (error) setMessage(error.message);
      else setMessage('Check your email to confirm your account.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else setMessage('Logged in successfully!');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border w-80">
        <h1 className="text-xl font-bold mb-4">
          {mode === 'signup' ? 'Create account' : 'Log in'}
        </h1>

        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded p-2 mb-3"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-3"
          required
        />

        <button type="submit" className="w-full bg-black text-white rounded p-2 mb-3">
          {mode === 'signup' ? 'Sign up' : 'Log in'}
        </button>

        <p className="text-sm text-gray-500">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
            className="underline"
          >
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </p>

        {message && <p className="text-sm mt-3 text-red-600">{message}</p>}
      </form>
    </main>
  );
}