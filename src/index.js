import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
import { Provider } from './my.react.redux';
import { createStore, applyMiddleware } from './my.redux';
// import { createStore } from 'redux';
import { counter } from './index.redux';
import { Grandfather } from './demo.context';
import thunk from 'redux-thunk';

// import './demo.redux';
const store = createStore(counter, applyMiddleware(thunk));

// ReactDOM.render(<Grandfather />, document.getElementById('root'));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
