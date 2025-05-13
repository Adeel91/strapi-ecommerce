'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!name || !description || !price || !image) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const imageFormData = new FormData();
      imageFormData.append('files', image);

      const uploadResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        imageFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (uploadResponse.status === 201) {
        const uploadedImage = uploadResponse.data[0];
        const imageId = uploadedImage.id;

        const productFormData = {
          data: {
            name,
            description,
            price,
            image: [imageId],
          },
        };

        const productResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
          productFormData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (productResponse.status === 201) {
          setSuccess('Product added successfully!');
          setName('');
          setDescription('');
          setPrice('');
          setImage(null);

          setTimeout(() => {
            router.push('/products');
          }, 2000);
        }
      } else {
        throw new Error('Image upload failed.');
      }
    } catch (err: any) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        Add a New Product
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-950">
          <div>
            <label className="block font-semibold text-lg mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2" htmlFor="description">
              Product Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block font-semibold text-lg mb-2" htmlFor="image">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition-all ease-in-out duration-300"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-500 text-lg font-semibold"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}
