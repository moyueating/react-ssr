import React from 'react';
import { StaticRouter } from 'react-router';
import Routes from '../client/routes';
import { Provider } from 'mobx-react';
import AppStore from '../client/store';


export default (
  <Provider appStore={AppStore}>
    <StaticRouter
      location='/list'
      context={{}}
    >
      <Routes />
    </StaticRouter>  
  </Provider>
)