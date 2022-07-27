import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './app/app';
import { TransactionsContextProvider } from './app/context/TransactionsContextProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TransactionsContextProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </TransactionsContextProvider>
);
