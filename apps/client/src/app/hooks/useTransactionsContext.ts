import { useContext } from 'react';
import {
  ITransactionContext,
  TransactionsContext,
} from '../context/TransactionsContextProvider';

const useTransactionsContext = (): ITransactionContext =>
  useContext(TransactionsContext) as ITransactionContext;

export default useTransactionsContext;
