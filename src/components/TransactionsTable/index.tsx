import { useTransactions } from '../../hooks/useTransactions';
import * as S from './styles';


export function TransactionsTable () {

  const { transactions } = useTransactions();

  return (
    <S.Container data-testid='transaction-table'>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {
                  // forma nativa de coverter valor para moeda em js
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(transaction.amount)
                }
              </td>
              <td>{transaction.category}</td>
              <td>
                {
                  // forma nativa de converter datas
                  new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </S.Container>
  );
}
