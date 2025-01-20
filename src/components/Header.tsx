import React from 'react';
import Image from "next/image";
import logo from "../assets/logo-blanc.png";
import Link from 'next/link';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="h-10 flex items-center">
          <Link href='/'>
              <Image src={logo} alt='logo' className="h-full object-contain" style={{ maxWidth: '200px' }}/>
          
          </Link>
        </div>
        <div className='space-x-4 ml-auto'></div>
        <div className="flex items-center space-x-4 ml-auto">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 rounded-lg text-black"
          />
          <Link href='/cart' className="flex items-center space-x-2">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
          <Link href='/account'  className="flex items-center space-x-2">
            <FaUser />
            <span>Account</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;