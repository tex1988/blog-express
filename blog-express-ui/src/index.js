import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.scss';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      suspense: true
    },
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </HashRouter>,
);