import React from 'react';
import Modal from 'react-modal';
import * as S from './styles';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal ({ isOpen, onRequestClose }: NewTransactionModalProps) {
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

      <S.Container>
        <h2>Cadastrar transação</h2>
        <input type="text" placeholder='Título' />
        <input type="number" placeholder='Valor' />

        <S.TransactionTypesContainer>
          <button type='button'>
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </button>

          <button type='button'>
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </button>
        </S.TransactionTypesContainer>

        <input type="text" placeholder='Categoria' />
        <button type="submit">
          Cadastrar
        </button>
      </S.Container>
    </Modal>
  )
}
