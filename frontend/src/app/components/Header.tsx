import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

type HeaderProps = {
  cartCount: number;
};

const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-semibold text-blue-600">
          MyShop
        </Link>

        <Link href="/products/add-product" className="text-lg">
          Add Product
        </Link>

        <div className="relative">
          <FaShoppingCart className="text-2xl text-gray-800 cursor-pointer" />
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
