import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const rootElement: JSX.Element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.render(rootElement, document.getElementById('root'));

serviceWorkerRegistration.register();
