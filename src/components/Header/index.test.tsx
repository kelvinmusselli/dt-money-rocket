import { Header } from '.';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TransactionsProvider } from '../../hooks/useTransactions';

import { api } from '../../services/api';
jest.mock('../../services/api');

describe('<Header />', () => {

  beforeAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  const renderComponent = () => {
    const mockProps = {
      onOpenNewTransactionModal: jest.fn()
    };

    return render(
      <TransactionsProvider>
        <Header { ...mockProps } />
      </TransactionsProvider>
    )
  };

  describe('Renders correctlt Header without transaction', () => {
    beforeEach(() => {
      api.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions: []
          }
        });
      });
    });

    it('Should render correctly', async() => {
      renderComponent();
      const newTransactionText = screen.getByText('Nova transação');
      await waitFor(() => {
        expect(newTransactionText).toBeInTheDocument();
      });
    });
  });

  describe('Renders correctlt Header with one transaction', () => {
    beforeEach(() => {
      api.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions: [{
              id: 1,
              title: 'Lazer',
              amount: -200,
              category: 'lazer',
              type: 'outcome',
              createdAt: '2020-01-01'
            }]
          }
        });
      });
    });

    it('Should render correctly', async () => {
      renderComponent();
      const newTransactionText = screen.getByText('Nova transação');
      await waitFor(() => {
        expect(newTransactionText).toBeInTheDocument();
      });
    });
  });
});
