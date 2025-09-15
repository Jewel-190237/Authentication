export type TPayment = {
  _id?: string;
  productId: string;
  amount: number;
  currency: 'BDT' | 'USD';
  transactionId: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELLED';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
