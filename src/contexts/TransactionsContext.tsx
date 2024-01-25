import { ReactNode, createContext, useEffect, useState } from "react";

interface TransactionType {
  id: number;
  description: string;
  type: "incoming" | "outcoming";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: TransactionType[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  async function loadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);
  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
