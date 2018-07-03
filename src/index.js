import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { counter } from "./index.redux";
import './demo.redux';
const store = createStore(counter);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
