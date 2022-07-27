import React, { FormEvent, memo } from 'react';
import { AiFillPlayCircle, BsInfoCircle, SiEthereum } from 'react-icons/all';
import useTransactionsContext from '../hooks/useTransactionsContext';
import {
  IFormData,
  ITransactionContext,
} from '../context/TransactionsContextProvider';
import shortenAddress from '../utils/shortenAddress';
import { Loader, YoutubeEmbed } from './index';
import metamask from '../../assets/images/metamask.png';

const InputStyles =
  'my-2 w-full p-2 outline-none bg-transparent border-slate-400 border-2 rounded text-white text-sm';

const Hero = () => {
  const { currentAccount, connectWallet, sendTransaction, isLoading } =
    useTransactionsContext() as ITransactionContext;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      addressTo: formData.get('addressTo'),
      amount: formData.get('amount'),
      message: formData.get('message'),
    };
    sendTransaction(data as IFormData);
  };

  return (
    <div className="flex w-full justify-center items-center bg-primary-yellow text-black">
      <div className="flex mf:flex-row flex-col items-start justify-between pt-4 md:pt-8 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col">
          <p className="text-3xl sm:text-5xl text-gradient py-1">
            Send Crypto <br />
            around the world
          </p>
          <p className="text-left mt-5 text-base text-base min-w-full mb-4">
            Exchange Ethers from one account to another through the{' '}
            <a
              target="_blank"
              href="https://ethereum.org/"
              rel="noreferrer"
              className="text-blue-900 font-bold underline"
            >
              Ethereum Blockchain
            </a>{' '}
            with{' '}
            <a
              target="_blank"
              href="https://metamask.io/download/"
              rel="noreferrer"
              className="text-blue-900 font-bold underline"
            >
              Metamask
            </a>
          </p>
          <div className="flex w-full md:h-40 justify-center items-center mb-4">
            {!currentAccount ? (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 w-56 bg-black text-primary-yellow border-primary-yellow border-2 p-3 rounded-full cursor-pointer hover:bg-gray-500"
              >
                <AiFillPlayCircle className="mr-2" />
                <p className="text-base font-semibold">Connect Wallet</p>
              </button>
            ) : (
              <img
                src={metamask}
                alt="title"
                className={`w-36 h-36 m-auto rounded-full`}
              />
            )}
          </div>
          <YoutubeEmbed embedId="LhK2ZSWzMpk" />
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-black rounded-xl"
          >
            <input
              placeholder="Address To"
              type="text"
              name="addressTo"
              required
              className={InputStyles}
            />
            <input
              placeholder="Amount (ETH)"
              type="number"
              name="amount"
              required
              step="0.0001"
              className={InputStyles}
            />
            <input
              placeholder="Enter Message"
              name="message"
              type="text"
              required
              className={InputStyles}
            />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="text-white w-full mt-2 p-2 bg-black text-primary-yellow border-primary-yellow border-2 rounded-full cursor-pointer hover:bg-gray-500"
              >
                Send now
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export const MemoizedHero = memo(Hero);
