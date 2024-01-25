import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from '../lib/axios'

interface TransactionType {
  id: number
  description: string
  type: 'incoming' | 'outcoming'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionsProps {
  description: string
  price: number
  category: string
  type: 'incoming' | 'outcoming'
}

interface TransactionsContextType {
  transactions: TransactionType[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionsProps) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionsProps) {
    const { category, description, price, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
