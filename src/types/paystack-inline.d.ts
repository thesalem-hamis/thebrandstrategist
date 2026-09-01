declare module "@paystack/inline-js" {
  export interface PaystackTransaction {
    reference: string;
    status: string;
    transaction?: string;
    trxref?: string;
    message?: string;
    [key: string]: unknown;
  }

  export interface PaystackTransactionOptions {
    key: string;
    email: string;
    amount: number;
    ref?: string;
    currency?: string;
    plan?: string;
    quantity?: number;
    firstname?: string;
    lastname?: string;
    phone?: string;
    metadata?: Record<string, unknown>;
    onSuccess?: (transaction: PaystackTransaction) => void;
    onCancel?: () => void;
    onError?: (error: PaystackTransaction) => void;
    onLoad?: () => void;
  }

  export default class PaystackPop {
    constructor(publicKey?: string);
    newTransaction(options: PaystackTransactionOptions): void;
    resumeTransaction(options: {
      key: string;
      accessCode: string;
      onSuccess?: (transaction: PaystackTransaction) => void;
      onCancel?: () => void;
      onError?: (error: PaystackTransaction) => void;
    }): void;
  }
}