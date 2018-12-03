import React from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import AppStore from './store';

export default () => {
  return (
    <Provider appStore={AppStore}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  )
}