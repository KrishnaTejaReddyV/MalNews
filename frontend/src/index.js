import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';

import Reducer from './store/Reducer';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = createStore(Reducer);

ReactDOM.render(<Provider store={store}><HttpsRedirect><App /></HttpsRedirect></Provider>, document.getElementById('root'));
registerServiceWorker();