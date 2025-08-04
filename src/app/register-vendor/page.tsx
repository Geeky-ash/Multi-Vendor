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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Make sure this matches your /api route file!
    const res = await fetch('/api/register-vendor', {
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
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-6">
      <div className="w-full max-w-2xl bg-white px-8 py-8 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Become a Vendor</h1>
        {error && <div className="mb-3 text-red-600 text-sm">{error}</div>}
        {success && <div className="mb-3 text-green-600 text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
          <div>
            <h2 className="font-semibold mb-2 text-gray-700 text-lg">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                name="name"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/30 transition"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                type="email"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/30 transition"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                type="password"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/30 transition"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2 text-gray-700 text-lg">Shop Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                name="shopName"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/30 transition"
                placeholder="Shop Name"
                value={formData.shopName}
                onChange={handleChange}
                required
              />
              <input
                name="shopAddress"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/30 transition"
                placeholder="Full Address"
                value={formData.shopAddress}
                onChange={handleChange}
                required
              />
              <input
                name="shopCity"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:border-primary focus:ring focus:ring-primary/30 transition"
                placeholder="City"
                value={formData.shopCity}
                onChange={handleChange}
                required
              />
              <select
                name="shopCategory"
                className="p-3 border border-gray-200 rounded-lg text-gray-900 focus:border-primary focus:ring focus:ring-primary/30 transition"
                value={formData.shopCategory}
                onChange={handleChange}
                required
              >
                <option value="">Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Stationery">Stationery</option>
                <option value="Footwear">Footwear</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white text-lg font-semibold py-3 rounded-lg hover:bg-primary-dark transition shadow"
          >
            Register My Shop
          </button>
        </form>
      </div>
    </div>
  );
}
