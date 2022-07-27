export interface IStructuredTransaction {
  addressTo: string;
  addressFrom: string;
  timestamp: string;
  message: string;
  amount: string | number;
}
