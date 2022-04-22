import React from 'react';
import { NewTransactionModal } from '.';
import { TransactionsProvider } from '../../hooks/useTransactions';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { api } from '../../services/api';

jest.mock('../../services/api');
jest.mock('react-modal', () => ({ children }) => children);

describe('<NewTransactionModal>', () => {

  const renderComponent = (props) => {
    const mockProps = {
      ...props,
      onRequestClose: jest.fn()
    };
    return render(
      <TransactionsProvider>
        <NewTransactionModal {...mockProps} />
      </TransactionsProvider>
    );
  };

  describe('Transaction deposit', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();

      api.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions:[]
          }
        });
      });

      api.post.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions:[{
              id: 1,
              title: 'Cadastrar',
              type: 'deposit',
              value: 100,
              category: 'Alimentação',
              created_at: '2020-01-01T00:00:00.000Z',
            }]
          }
        });
      });
    });

    it('Add new transaction deposit', async () => {
      renderComponent({ isOpen: true });
      await waitFor(() => {
        expect(screen.getByText('Cadastrar transação')).toBeInTheDocument();
      });

      const title = screen.getByPlaceholderText('Título');
      const amount = screen.getByPlaceholderText('Valor');
      const deposit = screen.getByTestId('deposit');
      const category = screen.getByPlaceholderText('Categoria');
      const submit = screen.getByRole('button', { name: 'Cadastrar' });
      fireEvent.change(title, { target: { value: 'Nova transação' } });
      fireEvent.change(amount, { target: { value: '100' } });
      fireEvent.change(category, { target: { value: 'Alimentação' } });
      fireEvent.click(deposit);
      fireEvent.submit(submit);
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled();
      });
    });
  });

  describe('Transaction withdraw', () => {

    beforeEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();

      api.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions:[]
          }
        });
      });

      api.post.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions:[{
              id: 1,
              title: 'Cadastrar',
              type: 'withdraw',
              value: 100,
              category: 'Alimentação',
              created_at: '2020-01-01T00:00:00.000Z',
            }]
          }
        });
      });
    });

    it('Add new transaction withdraw', async () => {
      renderComponent({ isOpen: true });
      await waitFor(() => {
        expect(screen.getByText('Cadastrar transação')).toBeInTheDocument();
      });

      const title = screen.getByPlaceholderText('Título');
      const amount = screen.getByPlaceholderText('Valor');
      const deposit = screen.getByTestId('withdraw');
      const category = screen.getByPlaceholderText('Categoria');
      const submit = screen.getByRole('button', { name: 'Cadastrar' });
      fireEvent.change(title, { target: { value: 'Nova transação' } });
      fireEvent.change(amount, { target: { value: '100' } });
      fireEvent.change(category, { target: { value: 'Alimentação' } });
      fireEvent.click(deposit);
      fireEvent.submit(submit);
      await waitFor(() => {
        expect(api.post).toHaveBeenCalled();
      });
    });
  });
});
