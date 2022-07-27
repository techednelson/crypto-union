import { Contract } from 'ethers';
import { ITransferStruct } from './ITransferStruct';

export interface ITransactionsContract extends Contract {
  getAllTransactions: () => Promise<ITransferStruct[]>;
  getTransactionsCount: () => Promise<string>;
  addToBlockchain: (
    addressTo: string,
    parsedAmount: any,
    message: string
  ) => Promise<any>;
}
