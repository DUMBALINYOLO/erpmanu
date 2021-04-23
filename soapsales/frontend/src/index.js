import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import store from './store';
import {Provider} from 'react-redux';
import 'sanitize.css/sanitize.css';
import './styles/layout/base.scss';




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('app')
);


