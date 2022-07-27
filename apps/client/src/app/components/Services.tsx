import React, { memo } from 'react';
import desktop from '../../assets/images/desktop.png';
import mobile from '../../assets/images/mobile.png';
import ethereum from '../../assets/images/ethereum.jpg';

interface ICard {
  key: number;
  title: string;
  subtitle: string;
  src: string;
}
const cards: ICard[] = [
  {
    key: 1,
    title: 'Send from your PC',
    src: desktop,
    subtitle: 'Send ethers from MetaMask Wallet',
  },
  {
    key: 2,
    title: 'Ethereum blockchain',
    src: ethereum,
    subtitle: 'Security is guaranteed with Ethereum blockchain',
  },
  {
    key: 3,
    title: 'Send from your mobile',
    src: mobile,
    subtitle: 'Send ethers from MetaMask Wallet',
  },
];

const Services = () => (
  <div className="flex flex-wrap mt-10 justify-around">
    {cards.map(({ key, title, subtitle, src }) => (
      <div
        key={key}
        className="flex-col p-3 m-2 cursor-pointer text-base text-center"
      >
        <img
          src={src}
          alt="title"
          className={`w-56 h-48 m-auto ${key === 2 ? 'rounded-full' : ''}`}
        />
        <div className="w-56 m-auto">
          <h3 className="mt-2 text-lg font-bold">{title}</h3>
          <p className="mt-1 text-md text-justify font-semibold text-slate-600">
            {subtitle}
          </p>
        </div>
      </div>
    ))}
  </div>
);

export const MemoizedServices = memo(Services);
