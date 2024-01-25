import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryCard, SummaryContainer } from "./styles";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { priceFromatter } from "../../utils/formatter";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "incoming") {
        acc.incoming += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcoming += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    {
      incoming: 0,
      outcoming: 0,
      total: 0,
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{priceFromatter.format(summary.incoming)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>{priceFromatter.format(summary.outcoming)}</strong>
      </SummaryCard>

      <SummaryCard variant={summary.total > 0 ? "green" : "red"}>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{priceFromatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
