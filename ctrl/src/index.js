import React from 'react';
import { Provider } from 'react-redux';
import { configureRefreshInterceptor } from 'config/http';
import ReactDOM from 'react-dom';
import store from 'config/store';
import GlobalStyle from 'theme/globalStyle';
import App from './App';

configureRefreshInterceptor();

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root')
);
