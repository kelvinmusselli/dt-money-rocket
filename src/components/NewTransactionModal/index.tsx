import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import * as S from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal ({ isOpen, onRequestClose }: NewTransactionModalProps) {

  const { createTransaction } = useTransactions();

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  const clearAllFields = () => {
    setType('deposit');
    setTitle('');
    setAmount(0);
    setCategory('');
  };

  const handleCreateNewTransaction = async (e: FormEvent) => {
    e.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type
    });
    clearAllFields();
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <button type='button' onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt="fechar modal" />
      </button>

      <S.Container onSubmit={handleCreateNewTransaction} data-testid='submitForm'>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder='Título'
          value={title}
          onChange={e => setTitle(e.target.value)}
          data-testid='titulo'
        />

        <input
          type="number"
          placeholder='Valor'
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          data-testid='valor'
        />

        <S.TransactionTypesContainer>
          <S.RadioBox
            isActive={type === 'deposit'}
            type='button'
            onClick={() => setType('deposit')}
            activeColor='green'
            data-testid='deposit'
            >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </S.RadioBox>

          <S.RadioBox
            isActive={type === 'withdraw'}
            type='button'
            onClick={() => setType('withdraw')}
            activeColor='red'
            data-testid='withdraw'
            >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </S.RadioBox >
        </S.TransactionTypesContainer>

        <input
          type="text"
          placeholder='Categoria'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </S.Container>
    </Modal>
  )
}
