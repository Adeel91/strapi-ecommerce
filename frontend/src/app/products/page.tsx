'use client';

import { useEffect, useState } from 'react';
import Header from '../components/Header';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    fetch('http://localhost:1337/api/products?populate=*')
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.data.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image?.url || '',
          };
        });
        setProducts(mapped);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-700">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <>
      <Header cartCount={cartCount} />
      <div className="pt-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ease-in-out duration-300"
          >
            {product.image && (
              <img
                src={`http://localhost:1337${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600 my-2">{product.description}</p>
              <p className="text-xl font-bold text-green-600">${product.price}</p>
              <button
                onClick={handleAddToCart}
                className="w-full mt-4 py-2 px-4 bg-blue-700 hover:bg-blue-600 text-white rounded-lg focus:outline-none transition-all ease-in-out duration-300 cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
