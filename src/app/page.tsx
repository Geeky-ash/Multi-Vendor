'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface IShop {
  _id: string;
  name: string;
  city: string;
  category: string;
}

export default function HomePage() {
  const [shops, setShops] = useState<IShop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      const res = await fetch('/api/shops');
      if (res.ok) {
        const data = await res.json();
        setShops(data);
      }
      setLoading(false);
    };

    fetchShops();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Shops</h1>
      {loading ? (
        <div>Loading shops...</div>
      ) : shops.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {shops.map((shop) => (
            <Link href={`/shops/${shop._id}`} key={shop._id} className="block bg-white p-4 rounded shadow hover:bg-gray-50">
              <div className="font-bold">{shop.name}</div>
              <div className="text-gray-700">{shop.city}</div>
              <div className="text-xs text-gray-400">{shop.category}</div>
            </Link>
          ))}
        </div>
      ) : (
        <div>No shops found.</div>
      )}
    </div>
  );
}
