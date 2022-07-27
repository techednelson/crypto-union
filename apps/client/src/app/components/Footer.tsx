import React, { memo } from 'react';
import { Logo } from './index';

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 bg-black">
    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3 text-lg font-semibold">
      <Logo />
      <p className="text-white text-right">
        © 2022 Crypto Union, Inc. All Rights Reserved
      </p>
    </div>
  </div>
);

export const MemoizedFooter = memo(Footer);
