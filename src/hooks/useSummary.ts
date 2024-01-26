import { useMemo } from 'react'
import { TransactionsContext } from '../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = useMemo(() => {
    return transactions.reduce(
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
  }, [transactions])

  return summary
}
