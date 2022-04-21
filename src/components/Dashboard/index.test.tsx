/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { Dashboard } from '.';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { api } from '../../services/api';
import { TransactionsProvider } from '../../hooks/useTransactions';

jest.mock('../../services/api');

describe('<Dashboard />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const renderComponent = () => {
    return render(
      <TransactionsProvider>
        <Dashboard />
      </TransactionsProvider>
    );
  };

  describe('Renders component when no transactions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      api.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions: []
          }
        });
      });
    });
    it('Should render correctly component', async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByTestId('summary')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-table')).toBeInTheDocument();
      })
    });
  });

  describe('Renders component when has transactions', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
      api.get.mockImplementation(() => {
        return Promise.resolve({
          data: {
            transactions: [
              {
                id: 1,
                title: 'Loan',
                amount: 200,
                category: 'Others',
                type: 'withdraw',
                createdAt: '2020-03-20T19:00:00.000Z'
              },
              {
                id: 2,
                title: 'Comida',
                amount: 400,
                category: 'Others',
                type: 'deposit',
                createdAt: '2020-03-20T19:00:00.000Z'
              }
            ]
          }
        });
      });
    });

    it('Should render correctly component with transaction withdraw', async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByTestId('summary')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-table')).toBeInTheDocument();
      })
      expect(screen.getByText('Loan')).toBeInTheDocument();
    });

    it('Should render correctly component with transaction deposit', async () => {
      renderComponent();
      await waitFor(() => {
        expect(screen.getByTestId('summary')).toBeInTheDocument();
        expect(screen.getByTestId('transaction-table')).toBeInTheDocument();
      })
      expect(screen.getByText('Comida')).toBeInTheDocument();
    });
  });
});
