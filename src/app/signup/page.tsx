'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Sign Up</h1>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-600"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-600"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full p-2 border rounded text-gray-900 placeholder-gray-600"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition" type="submit">
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-700">
        Already have an account?{' '}
        <a className="text-blue-700 hover:underline" href="/login">Log in</a>
      </p>
    </div>
  );
}
