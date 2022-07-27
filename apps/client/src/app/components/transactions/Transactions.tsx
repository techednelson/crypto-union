import React, { memo } from 'react';
import { TransactionsCard } from './TransactionCard';
import useTransactionsContext from '../../hooks/useTransactionsContext';

const Transactions = () => {
  const { transactions, currentAccount } = useTransactionsContext();
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 bg-primary-yellow">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2 text-gradient">
          {currentAccount
            ? transactions.length
              ? 'Latest Transactions'
              : 'There is no transactions yet'
            : 'Connect your account to see the latest transactions'}
        </h3>
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions?.reverse().map((transaction, index) => (
            <TransactionsCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const MemoizedTransactions = memo(Transactions);
