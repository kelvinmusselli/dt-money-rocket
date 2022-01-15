import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transactions: Model, // transactions: Model,
  },
  seeds(server) {
    server.db.loadData({ // pre trazer dados fakes do db
      transactions: [
        {
          id: 1,
          title: 'Desenvolvimento de website',
          amount: 1900,
          category: 'Desenvolvimento',
          type: 'deposit',
          createdAt: new Date('2021-01-20 12:00:00'),
        }
      ],
    });
  },

  routes() {
    this.namespace = 'api'; // endpoint do miragejs

    this.get('/transactions', () => {
      return this.schema.all('transactions'); // retorna todos os dados do db fake
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transactions', data); // para salvar no db fake
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
