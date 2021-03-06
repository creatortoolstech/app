import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Auth0Provider
      domain="dev-kt7udnzv.us.auth0.com"
      clientId="PrHnGd36Bwc06X5B6o3rRDPQL8piZuB6"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
