import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import Global from './store';

const initialState = JSON.parse(window.__INITIAL__STATE__) || {}
// console.log(initialState)
// console.log(initialState.global)
const appStore = {
  global: new Global(initialState.global)
}

export default () => {
  return (
    <Provider appStore={appStore}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}