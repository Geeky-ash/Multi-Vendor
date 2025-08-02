'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await signIn('credentials', { redirect: false, email, password });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Login</h1>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-700">
        Don't have an account?{' '}
        <a className="text-blue-700 hover:underline" href="/signup">Get started</a>
      </p>
    </div>
  );
}
