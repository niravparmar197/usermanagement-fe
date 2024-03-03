
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer/>
        <App />
    </Provider>
  </React.StrictMode>
)

reportWebVitals();