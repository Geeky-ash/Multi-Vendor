import { cache } from 'react';
import dbConnect from '@/lib/mongodb';
import Shop, { IShop } from '@/models/Shop';
import Product, { IProduct } from '@/models/Product';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Image as ImageIcon } from 'lucide-react';

interface ShopProfileProps {
    params: { id: string };
}

export const getShopData = cache(async (id: string): Promise<{ shop: IShop | null; products: IProduct[] }> => {
  try {
    await dbConnect();
    const shopDoc = await Shop.findOne({ _id: id, status: 'approved' });

    if (!shopDoc) {
      return { shop: null, products: [] };
    }

    const productsDocs = await Product.find({ shop: shopDoc._id });
    
    return { 
      shop: JSON.parse(JSON.stringify(shopDoc)), 
      products: JSON.parse(JSON.stringify(productsDocs)) 
    };

  } catch (error) {
    console.error("Database Error:", error);
    return { shop: null, products: [] };
  }
});

export async function generateMetadata({ params }: ShopProfileProps): Promise<Metadata> {
    const { shop } = await getShopData(params.id);
    return {
        title: shop ? `${shop.name} | Drappi` : 'Shop Not Found',
    };
}

export default async function ShopProfilePage({ params }: ShopProfileProps) {
    const { shop, products } = await getShopData(params.id);

    if (!shop) {
        return (
            <div className="text-center py-20">
                <h1 className="text-3xl font-bold">Shop Not Found</h1>
                <p className="text-gray-500 mt-2">The shop you're looking for doesn't exist or is not available.</p>
            </div>
        );
    }

    return (
        <div>
          <header className="bg-gray-100 border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">{shop.name}</h1>
              <p className="mt-2 text-md text-gray-600">{shop.address}, {shop.city}</p>
            </div>
          </header>

          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Products</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <div key={String(product._id)} className="group bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                      {/* --- FIX: Changed product.imageUrl to product.image --- */}
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <p className="mt-auto pt-2 text-lg font-bold text-gray-900">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gray-100 rounded-lg">
                <p className="text-gray-500">This shop has not added any products yet.</p>
              </div>
            )}
          </main>
        </div>
    );
}