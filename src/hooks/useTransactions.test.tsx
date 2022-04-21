import { TransactionsProvider } from './useTransactions';
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react';
import { api } from '../services/api';

jest.mock('../services/api');

describe('<useTransactions />', () => {

  const customRender = (ui, {providerProps, ...renderOptions}) => {
    return render(
      <TransactionsProvider {...providerProps}>{ui}</TransactionsProvider>,
      renderOptions,
    )
  }

  beforeEach(() => {
    api.get.mockImplementation(() => {
      return Promise.resolve({
        data: {
          transactions: []
        }
      })
    });
  });

  it('Should render without crashing', async () => {
    const providerProps = {
      transactions: [],
      createTransaction: jest.fn()
    };
    customRender(null, { providerProps });
    await waitFor(() => expect(api.get).toHaveBeenCalledTimes(1));
  });
});
