import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: string;
}

// export interface TransactionInput {
//   title: string;
//   amount: number;
//   category: string;
//   type: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;
// o Omit irá ignorar os campos que não queremos enviar para o backend

type TransactionInputPick = Pick<Transaction, 'title' | 'amount' | 'category' | 'type'>;
// o Pick irá selecionar os campos que queremos enviar para o backend


interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions').then(response => {
      setTransactions(response.data.transactions);
    });
  },[]);

  const createTransaction = async(transactionItem: TransactionInput | TransactionInputPick) => {
    const response = await api.post('/transactions', {
      ...transactionItem,
      createdAt: new Date()
    });
    setTransactions([...transactions, response.data.transactions]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export function useTransactions () {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
