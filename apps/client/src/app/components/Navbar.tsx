import React, { memo, useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiFillGithub, AiOutlineClose } from 'react-icons/ai';
import { Logo } from './index';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const getMenu = (isMobile: boolean) =>
    ['Send Crypto', 'Track a transfer', 'Wallets'].map((item, index) => (
      <li
        key={item + index}
        className={`mx-4 cursor-pointer ${isMobile && 'my-2 text-lg'}`}
      >
        {item}
      </li>
    ));

  const getAuthComponents = () => (
    <>
      <li className="text-primary-yellow mx-4 cursor-pointer hover:text-gray-500">
        Register
      </li>
      <li className="bg-black text-primary-yellow border-primary-yellow border-2 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-gray-500">
        Login
      </li>
      <li className="text-primary-yellow mx-4 cursor-pointer hover:text-gray-500">
        <a
          target="_blank"
          href="https://github.com/techednelson/crypto-union"
          rel="noreferrer"
        >
          <AiFillGithub size="2rem" />
        </a>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-sm">
      <nav className="w-full flex md:justify-center justify-between items-center p-4 bg-black">
        <Logo />
        <ul className="text-white md:flex hidden justify-between items-center">
          {getMenu(false)}
          {getAuthComponents()}
        </ul>
        <div className="flex relative">
          {!toggleMenu ? (
            <HiMenuAlt4
              fontSize={28}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            />
          ) : (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md bg-black text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={() => setToggleMenu(false)}
                />
              </li>
              <div className="flex justify-between items-center">
                {getAuthComponents()}
              </div>
              {getMenu(true)}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export const MemoizedNavbar = memo(Navbar);
