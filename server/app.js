import React from 'react';
import { StaticRouter } from 'react-router';
import Routes from '../client/routes';
import { Provider, useStaticRendering } from 'mobx-react';
import AppStore from '../client/store';

useStaticRendering(true)

export default (url, routerContext) => {

  return (
    <Provider appStore={AppStore}>
      <StaticRouter
        location={url}
        context={routerContext}
      >
        <Routes />
      </StaticRouter>  
    </Provider>
  )
}