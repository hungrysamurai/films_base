import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';

import { store, persistor } from './store/store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
