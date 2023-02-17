import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "./styles/App.css";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "./components/store";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( // Redux store provider.
    <Provider store={store}>
        <App />
    </Provider>
);
reportWebVitals();