import { useContext } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext)

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'incoming') {
        acc.incoming += transaction.price
        acc.total += transaction.price
      } else {
        acc.outcoming += transaction.price
        acc.total -= transaction.price
      }
      return acc
    },
    {
      incoming: 0,
      outcoming: 0,
      total: 0,
    },
  )

  return summary
}
