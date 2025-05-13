import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500 text-white">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        🛍 Welcome to My Shop
      </h1>
      <p className="text-lg mb-8 text-center">
        Discover our curated collection of high-quality products.
      </p>
      <Link
        href="/products"
        className="text-xl font-semibold bg-blue-700 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-all ease-in-out duration-300"
      >
        View Products →
      </Link>
    </main>
  );
}
