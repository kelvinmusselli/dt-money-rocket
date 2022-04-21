import * as S from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';


export function Summary() {

  const { transactions } = useTransactions();

  // const income = transactions.reduce((accumulator, transaction) => {
  //   if (transaction.type === 'income') {
  //     accumulator += transaction.amount;
  //   }
  //   return accumulator;
  // }, 0);

  // const outcome = transactions.reduce((accumulator, transaction) => {
  //   if (transaction.type === 'outcome') {
  //     accumulator += transaction.amount;
  //   }
  //   return accumulator;
  // }, 0);

  // const total = income - outcome;

  const summary = transactions.reduce((accumulator, transaction) => {
    if(transaction.type === 'deposit') {
      accumulator.deposits += transaction.amount;
      accumulator.total += transaction.amount;
    } else {
      accumulator.withdraws += transaction.amount;
      accumulator.total -= transaction.amount;
    }
    return accumulator;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  return (
    <S.Container data-testid='summary'>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt='entradas' />
        </header>
        <strong>
        {
          // forma nativa de coverter valor para moeda em js
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposits)
        }
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt='saidas' />
        </header>
        <strong>
        {
          // forma nativa de coverter valor para moeda em js
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.withdraws)
        }
        </strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt='total' />
        </header>
        <strong>
        {
          // forma nativa de coverter valor para moeda em js
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)
        }
        </strong>
      </div>
    </S.Container>
  );
}
