import { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

/**
 * 1º modo de criar um tipo parecido com outro que já existe 
 * 
interface TransactionInput{
  title: string;
  amount: number;
  type: string;
  category: string;
}
*/

/**
 * Outra forma é usando o Omit, que omite alguns campos
 * Além dele, há também o pick, que só pega alguns campos específicos
 */
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsResponse {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactonsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactonsContextData>(
  {} as TransactonsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get<TransactionsResponse>('transactions')
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInput) {
    api.post('/transactions', transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
