'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VendorRegistrationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    shopName: '',
    shopAddress: '',
    shopCity: '',
    shopCategory: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const res = await fetch('/api/register/vendor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message);
      setTimeout(() => router.push('/login'), 3000);
    } else {
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Become a Vendor</h1>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      {success && <div className="mb-2 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="font-semibold mb-2 text-gray-900">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="name"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          <h2 className="font-semibold mb-2 text-gray-900">Shop Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              name="shopName"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="Shop Name"
              value={formData.shopName}
              onChange={handleChange}
              required
            />
            <input
              name="shopAddress"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="Shop Address"
              value={formData.shopAddress}
              onChange={handleChange}
              required
            />
            <input
              name="shopCity"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="City"
              value={formData.shopCity}
              onChange={handleChange}
              required
            />
            <input
              name="shopCategory"
              className="p-2 border rounded text-gray-900 placeholder-gray-600"
              placeholder="Category"
              value={formData.shopCategory}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-900 transition">
          Register My Shop
        </button>
      </form>
    </div>
  );
}
