'use client';
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";

// ✅ Interface Definitions
interface IShop {
  _id: string;
  name: string;
  city: string;
  status: string;
}

interface IProduct {
  _id: string;
  name: string;
  price: number;
  shopId: string;
}

export default function VendorDashboard() {
  const { data: session } = useSession();
  const [shop, setShop] = useState<IShop | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async (shopId: string) => {
    const productRes = await fetch(`/api/vendor/products?shopId=${shopId}`);
    if (productRes.ok) {
      const productData = await productRes.json();
      setProducts(productData);
    }
  };

  useEffect(() => {
    if (session?.user.role === 'vendor') {
      const fetchShopData = async () => {
        const shopRes = await fetch('/api/vendor/shop');
        if (shopRes.ok) {
          const shopData = await shopRes.json();
          setShop(shopData);
          fetchProducts(shopData._id);
        }
      };
      fetchShopData();
    }
  }, [session]);

  const handleAddProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!shop || isSubmitting) return;
    setIsSubmitting(true);
    const res = await fetch('/api/vendor/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newProductName,
        price: parseFloat(newProductPrice),
        shopId: shop._id,
      }),
    });
    if (res.ok) {
      setNewProductName('');
      setNewProductPrice('');
      fetchProducts(shop._id);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-8">
      {/* Left: Shop Info */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-1">
        {shop ? (
          <>
            <h2 className="text-xl font-bold mb-2">{shop.name}</h2>
            <div className="text-sm text-gray-700">{shop.city}</div>
            <div className="mt-2 rounded px-2 py-1 text-xs bg-gray-200 inline-block">Status: {shop.status}</div>
          </>
        ) : (
          <div>Loading Shop Info...</div>
        )}
      </div>
      {/* Right: Products and Add Form */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h3 className="font-bold text-lg mb-2">My Products</h3>
          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {products.map(product => (
                <div key={product._id} className="border rounded p-4 bg-white">
                  <div className="font-bold text-md">{product.name}</div>
                  <div className="text-gray-900 font-semibold">₹{product.price}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">You haven&apos;t added any products yet.</div>
          )}
        </div>
        <form onSubmit={handleAddProduct} className="bg-gray-50 p-4 rounded space-y-3">
          <h3 className="font-semibold text-base mb-2">Add a New Product</h3>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Product Name"
            value={newProductName}
            onChange={e => setNewProductName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            type="number"
            min={0}
            className="w-full p-2 border rounded"
            placeholder="Price (₹)"
            value={newProductPrice}
            onChange={e => setNewProductPrice(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
