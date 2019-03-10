import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import Global from './store';
import appConfig from '../app.config';

const initialState = window.__INITIAL__STATE__ || {}

const appStore = {
  global: new Global(initialState.global)
}

export default () => {
  return (
    <Provider appStore={appStore}>
      <BrowserRouter basename={appConfig.basename}>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}