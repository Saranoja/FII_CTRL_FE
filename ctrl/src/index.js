import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import store from 'config/store';
import GlobalStyle from 'theme/globalStyle';

ReactDOM.render(
	<Provider store={store}>
		<GlobalStyle />
		<App />
	</Provider>,
	document.getElementById('root')
);
