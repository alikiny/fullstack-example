import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux';
import { CookiesProvider } from "react-cookie";

import reportWebVitals from './reportWebVitals';
import App from './App';
import store from "./redux/stores"


ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <GoogleOAuthProvider clientId='42037279730-ev2bjqfkd1shup9646sq7kmndavp7fcl.apps.googleusercontent.com'>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
