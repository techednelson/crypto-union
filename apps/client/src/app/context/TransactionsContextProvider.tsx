import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ethers } from 'ethers';
import { contractABI } from '../utils/constants';
import {
  IStructuredTransaction,
  ITransactionsContract,
  ITransferStruct,
} from '../models';

export interface IFormData {
  addressTo: string;
  amount: string;
  message: string;
}

export interface ITransactionContext {
  transactionCount: string | null;
  connectWallet: () => void;
  transactions: IStructuredTransaction[];
  currentAccount: string;
  isLoading: boolean;
  sendTransaction: (formData: IFormData) => void;
}

export const TransactionsContext = createContext<ITransactionContext | null>(
  null
);

const { ethereum } = window as any;

const createEthereumContract = (): ITransactionsContract => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(
    process.env['NX_CONTRACT_ADDRESS'] ?? '',
    contractABI,
    signer
  ) as ITransactionsContract;
};

interface ITransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContextProvider = ({
  children,
}: ITransactionsContextProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionCount, setTransactionCount] = useState<string | null>(
    localStorage.getItem('transactionCount')
  );
  const [transactions, setTransactions] = useState<IStructuredTransaction[]>(
    []
  );

  const getAllTransactions = useCallback(async () => {
    try {
      const ethereumContract = createEthereumContract();
      const availableTransactions: ITransferStruct[] =
        await ethereumContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            Number(transaction.timestamp) * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: Number((transaction.amount as any)._hex) / 10 ** 18,
        })
      );

      setTransactions(structuredTransactions);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const checkIfTransactionsExists = useCallback(async () => {
    try {
      const ethereumContract = createEthereumContract();
      const currentTransactionsCount =
        await ethereumContract.getTransactionsCount();

      window.localStorage.setItem(
        'transactionsCount',
        currentTransactionsCount
      );
    } catch (error) {
      console.error(error);
    }
  }, []);

  const checkIfWalletIsConnect = useCallback(async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (!accounts.length) {
        return console.log('No accounts found');
      }
      setCurrentAccount(accounts[0]);
      await getAllTransactions();
      await checkIfTransactionsExists();
    } catch (error) {
      console.error(error);
    }
  }, [checkIfTransactionsExists, getAllTransactions]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert('Please install MetaMask.');
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const sendTransaction = async (formData: IFormData) => {
    try {
      if (!ethereum) {
        return console.log('No ethereum object');
      }
      const { addressTo, amount, message } = formData;
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208', // 21000 GWEI
            value: parsedAmount._hex,
          },
        ],
      });
      const ethereumContract = createEthereumContract();
      const transactionHash = await ethereumContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message
      );
      setIsLoading(true);
      await transactionHash.wait();
      setIsLoading(false);
      const transactionsCount = await ethereumContract.getTransactionsCount();
      setTransactionCount(transactionsCount);
      window.location.reload();
      alert('Transaction successful!.');
    } catch (error) {
      console.error(error);
      alert('Something went wrong!.');
    }
  };

  useEffect(() => {
    (async () => {
      if (!ethereum) {
        return alert('Please install MetaMask.');
      }
      await checkIfWalletIsConnect();
    })();
  }, [checkIfWalletIsConnect]);

  return (
    <TransactionsContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
