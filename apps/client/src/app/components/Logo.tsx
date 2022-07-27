import React, { memo } from 'react';
import logo from '../../assets/images/logo.png';

const Logo = () => {
  return (
    <div className="flex md:flex-[0.5] items-center">
      <img
        src={logo}
        alt="logo"
        className="w-8 h-8 cursor-pointer rounded mr-2"
      />
      <h3 className="text-primary-yellow font-semibold">Crypto Union</h3>
    </div>
  );
};

export const MemoizedLogo = memo(Logo);
